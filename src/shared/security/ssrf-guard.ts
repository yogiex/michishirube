import { isIP } from 'node:net';
import { promises as dns } from 'node:dns';
import { UpstreamError } from '@/shared/errors/index.js';

const BLOCKED_EXACT_HOSTS = new Set([
  'localhost',
  'localhost.localdomain',
  'metadata.google.internal',
  '0.0.0.0',
]);

const BLOCKED_SUFFIXES = [
  '.local',
  '.internal',
  '.cluster.local',
  '.localdomain',
  '.home.arpa',
] as const;

function isPrivateIpv4(ip: string): boolean {
  const parts = ip.split('.');
  if (parts.length !== 4) return true;
  const octets: number[] = [];
  for (const part of parts) {
    if (!/^\d{1,3}$/.test(part)) return true;
    const n = Number(part);
    if (n > 255) return true;
    octets.push(n);
  }
  const a = octets[0];
  const b = octets[1];
  const c = octets[2];
  if (a === undefined || b === undefined || c === undefined) return true;

  if (a === 0) return true; // 0.0.0.0/8
  if (a === 10) return true; // 10.0.0.0/8
  if (a === 100 && b >= 64 && b <= 127) return true; // 100.64.0.0/10
  if (a === 127) return true; // 127.0.0.0/8
  if (a === 169 && b === 254) return true; // 169.254.0.0/16
  if (a === 172 && b >= 16 && b <= 31) return true; // 172.16.0.0/12
  if (a === 192 && b === 0 && c === 0) return true; // 192.0.0.0/24
  if (a === 192 && b === 168) return true; // 192.168.0.0/16
  if (a === 198 && (b === 18 || b === 19)) return true; // 198.18.0.0/15
  if (a >= 224) return true; // 224.0.0.0/4 (multicast) + 240.0.0.0/4
  return false;
}

function isPrivateIpv6(ip: string): boolean {
  const withoutZone = ip.toLowerCase().split('%')[0] ?? ip.toLowerCase();

  if (withoutZone === '::' || withoutZone === '::1') return true;

  if (withoutZone.startsWith('::ffff:')) {
    const rest = withoutZone.slice('::ffff:'.length);
    if (rest.includes('.')) return isPrivateIpv4(rest);
    const hexPair = /^([0-9a-f]{1,4}):([0-9a-f]{1,4})$/.exec(rest);
    const hiHex = hexPair?.[1];
    const loHex = hexPair?.[2];
    if (hiHex !== undefined && loHex !== undefined) {
      const hi = Number.parseInt(hiHex, 16);
      const lo = Number.parseInt(loHex, 16);
      return isPrivateIpv4(`${hi >> 8}.${hi & 0xff}.${lo >> 8}.${lo & 0xff}`);
    }
    return false;
  }

  if (withoutZone.startsWith('::')) return false; // first hextet = 0, bukan fc/fd/fe

  const firstHextet = withoutZone.split(':')[0] ?? '';
  if (!/^[0-9a-f]{1,4}$/.test(firstHextet)) return true; // gagal parse → fail-closed
  const value = Number.parseInt(firstHextet, 16);
  const byte1 = (value >> 8) & 0xff;
  const byte2 = value & 0xff;
  if (byte1 === 0xfc || byte1 === 0xfd) return true; // fc00::/7
  if (byte1 === 0xfe && (byte2 & 0xc0) === 0x80) return true; // fe80::/10
  return false;
}

export function isPrivateIp(ip: string): boolean {
  const bare = ip.startsWith('[') && ip.endsWith(']') ? ip.slice(1, -1) : ip;
  const version = isIP(bare);
  if (version === 4) return isPrivateIpv4(bare);
  if (version === 6) return isPrivateIpv6(bare);
  return false;
}

function stripBrackets(hostname: string): string {
  return hostname.startsWith('[') && hostname.endsWith(']') ? hostname.slice(1, -1) : hostname;
}

const DNS_LOOKUP_TIMEOUT_MS = 2000;

type DnsRecord = { address: string; family: number };

async function lookupAll(host: string): Promise<ReadonlyArray<DnsRecord>> {
  let timer: NodeJS.Timeout | undefined;
  try {
    const timeout = new Promise<never>((_, reject) => {
      timer = setTimeout(() => reject(new Error('DNS lookup timeout')), DNS_LOOKUP_TIMEOUT_MS);
    });
    return await Promise.race([dns.lookup(host, { all: true }), timeout]);
  } finally {
    if (timer !== undefined) clearTimeout(timer);
  }
}

export async function assertSafeUpstream(rawUrl: string): Promise<void> {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    throw new UpstreamError('URL upstream tidak valid', {
      meta: { rawUrl },
    });
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new UpstreamError('Protokol upstream hanya boleh http atau https', {
      meta: { rawUrl },
    });
  }

  if (url.username !== '' || url.password !== '') {
    throw new UpstreamError('URL upstream tidak boleh berisi kredensial', {
      meta: { rawUrl },
    });
  }

  const hostname = url.hostname.toLowerCase();
  const bare = stripBrackets(hostname);

  if (isIP(bare) !== 0) {
    if (isPrivateIp(bare)) {
      throw new UpstreamError('IP upstream berada di jaringan privat atau reserved', {
        meta: { host: hostname, address: bare },
      });
    }
    return;
  }

  if (BLOCKED_EXACT_HOSTS.has(bare)) {
    throw new UpstreamError('Hostname upstream diblokir', {
      meta: { host: hostname },
    });
  }
  for (const suffix of BLOCKED_SUFFIXES) {
    if (bare.endsWith(suffix)) {
      throw new UpstreamError('Hostname upstream diblokir', {
        meta: { host: hostname },
      });
    }
  }

  let addresses: ReadonlyArray<DnsRecord>;
  try {
    addresses = await lookupAll(bare);
  } catch {
    // DNS gagal/timeout (ENOTFOUND/EAI_AGAIN/dsb) → izinkan; koneksi akan gagal nanti.
    return;
  }

  if (addresses.length === 0) {
    throw new UpstreamError('Hostname upstream tidak memiliki record DNS', {
      meta: { host: hostname },
    });
  }

  for (const entry of addresses) {
    if (isPrivateIp(entry.address)) {
      throw new UpstreamError('Hostname upstream resolve ke IP privat atau reserved', {
        meta: { host: hostname, address: entry.address },
      });
    }
  }
}
