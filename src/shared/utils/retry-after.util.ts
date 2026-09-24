export function parseRetryAfterMs(
  value: string | undefined,
  nowMs = Date.now(),
): number | undefined {
  if (value === undefined) return undefined;

  const trimmed = value.trim();
  if (trimmed === '') return undefined;

  if (/^\d+$/.test(trimmed)) {
    const seconds = Number(trimmed);
    return Number.isSafeInteger(seconds) ? seconds * 1_000 : undefined;
  }

  const retryAtMs = Date.parse(trimmed);
  if (Number.isNaN(retryAtMs)) return undefined;

  return Math.max(0, retryAtMs - nowMs);
}
