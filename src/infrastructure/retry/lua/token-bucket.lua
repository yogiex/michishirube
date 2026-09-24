local key = KEYS[1]
local operation = ARGV[1]
local now_ms = tonumber(ARGV[2])
local ttl_ms = tonumber(ARGV[3])
local capacity = tonumber(ARGV[4])

local state = redis.call('HMGET', key, 'tokens', 'capacity', 'consumed', 'resets_at')
local tokens = tonumber(state[1])
local stored_capacity = tonumber(state[2])
local consumed = tonumber(state[3])
local resets_at = tonumber(state[4])

if tokens == nil or stored_capacity == nil or consumed == nil or resets_at == nil or now_ms >= resets_at then
  tokens = capacity
  stored_capacity = capacity
  consumed = 0
  resets_at = now_ms + ttl_ms
end

local status = 2
if operation == 'acquire' then
  if tokens >= 1 then
    tokens = tokens - 1
    consumed = consumed + 1
    status = 1
  else
    tokens = 0
    status = 0
  end
elseif operation == 'refund' then
  consumed = math.max(0, consumed - 1)
  tokens = math.min(stored_capacity, tokens + 1)
elseif operation == 'reset' then
  tokens = stored_capacity
  consumed = 0
  resets_at = now_ms + ttl_ms
end

redis.call('HSET', key, 'tokens', tostring(tokens), 'capacity', tostring(stored_capacity), 'consumed', tostring(consumed), 'resets_at', tostring(resets_at))
redis.call('PEXPIRE', key, ttl_ms)

return { status, tostring(stored_capacity), tostring(consumed), tostring(resets_at) }
