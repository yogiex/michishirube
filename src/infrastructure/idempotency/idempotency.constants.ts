export const IDEMPOTENCY_SCRIPT_NAME = 'idempotency';
export const IDEMPOTENCY_DEFAULT_TTL_MS = 86_400_000;
export const IDEMPOTENCY_MAX_TTL_MS = 86_400_000;
export const IDEMPOTENCY_MAX_RESPONSE_BYTES = 1_048_576;
export const IDEMPOTENCY_MAX_HEADER_COUNT = 100;
export const IDEMPOTENCY_MAX_HEADER_BYTES = 32_768;

export const IDEMPOTENCY_LUA = String.raw`
local operation = ARGV[1]
local fingerprint = ARGV[2]
local ttl = tonumber(ARGV[3])
local raw = redis.call('GET', KEYS[1])

if operation == 'acquire' then
  if not raw then
    local record = cjson.encode({
      status = 'in_progress',
      fingerprint = fingerprint,
      createdAt = ARGV[4],
      expiresAt = ARGV[5]
    })
    redis.call('SET', KEYS[1], record, 'PX', ttl, 'NX')
    return { 'acquired' }
  end

  local current = cjson.decode(raw)
  if current['fingerprint'] ~= fingerprint then
    return { 'conflict' }
  end
  if current['status'] == 'completed' then
    return { 'completed', current['response'] }
  end
  return { 'in_progress' }
end

if not raw then
  return 0
end

local current = cjson.decode(raw)
if current['status'] ~= 'in_progress' then
  return 0
end

if operation == 'complete' then
  local record = cjson.encode({
    status = 'completed',
    fingerprint = current['fingerprint'],
    createdAt = current['createdAt'],
    expiresAt = ARGV[5],
    response = cjson.decode(ARGV[6])
  })
  redis.call('SET', KEYS[1], record, 'PX', ttl)
  return 1
end

if operation == 'release' then
  return redis.call('DEL', KEYS[1])
end

return redis.error_reply('IDEMPOTENCY_INVALID_OPERATION')
`;
