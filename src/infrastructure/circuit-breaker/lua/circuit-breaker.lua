local operation = ARGV[1]
local threshold = tonumber(ARGV[2])
local resetMs = tonumber(ARGV[3])
local now = tonumber(ARGV[4])
local halfOpenMax = tonumber(ARGV[5])
local state = redis.call('HMGET', KEYS[1], 'state', 'failures', 'openedAt', 'halfOpenCalls')
local current = state[1] or 'closed'
local failures = tonumber(state[2]) or 0
local openedAt = tonumber(state[3]) or 0
local halfOpenCalls = tonumber(state[4]) or 0

if operation == 'before' then
  if current == 'open' then
    if now - openedAt < resetMs then
      return { 'reject', current, failures, resetMs - (now - openedAt), 0 }
    end
    current = 'half_open'
    halfOpenCalls = 0
    redis.call('HSET', KEYS[1], 'state', current, 'openedAt', 0, 'halfOpenCalls', 0)
    redis.call('EXPIRE', KEYS[1], resetMs)
    return { 'allow', current, failures, 0, 1 }
  end
  if current == 'half_open' then
    if halfOpenCalls >= halfOpenMax then
      return { 'reject', current, failures, 0, halfOpenCalls }
    end
    halfOpenCalls = halfOpenCalls + 1
    redis.call('HSET', KEYS[1], 'halfOpenCalls', halfOpenCalls)
    redis.call('EXPIRE', KEYS[1], resetMs)
    return { 'allow', current, failures, 0, halfOpenCalls }
  end
  return { 'allow', current, failures, 0, 0 }
end

if operation == 'success' then
  redis.call('HSET', KEYS[1], 'state', 'closed', 'failures', 0, 'openedAt', 0, 'halfOpenCalls', 0)
  redis.call('DEL', KEYS[1])
  return { 'allow', 'closed', 0, 0, 0 }
end

if operation == 'failure' then
  failures = failures + 1
  if current == 'half_open' or failures >= threshold then
    redis.call('HSET', KEYS[1], 'state', 'open', 'failures', failures, 'openedAt', now, 'halfOpenCalls', 0)
    redis.call('PEXPIRE', KEYS[1], resetMs)
    return { 'reject', 'open', failures, resetMs, 0 }
  end
  redis.call('HSET', KEYS[1], 'failures', failures)
  redis.call('PEXPIRE', KEYS[1], resetMs)
  return { 'allow', 'closed', failures, 0, 0 }
end

return redis.error_reply('CIRCUIT_BREAKER_INVALID_OPERATION')
