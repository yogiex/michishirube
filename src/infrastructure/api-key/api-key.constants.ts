export const API_KEY_ENTITY_PREFIX = 'api-key:entity:';
export const API_KEY_HASH_INDEX_PREFIX = 'api-key:hash:';
export const API_KEY_TENANT_INDEX_PREFIX = 'api-key:tenant:';

export const CREATE_API_KEY_SCRIPT = `
if redis.call('EXISTS', KEYS[1]) == 1 or redis.call('EXISTS', KEYS[3]) == 1 then
  return 0
end
redis.call('SADD', KEYS[2], ARGV[1])
redis.call('SET', KEYS[1], ARGV[2])
redis.call('SET', KEYS[3], ARGV[1])
return 1
`;

export const REGISTER_API_KEY_INDEX_SCRIPT = `
if redis.call('GET', KEYS[1]) == ARGV[1] then
  return 1
end
if redis.call('EXISTS', KEYS[1]) == 1 then
  return 0
end
redis.call('SET', KEYS[1], ARGV[1])
return 1
`;

export const REVOKE_API_KEY_SCRIPT = `
local raw = redis.call('GET', KEYS[1])
if not raw then
  return 0
end
local current = cjson.decode(raw)
if current['tenantId'] ~= ARGV[1] or current['status'] == 'revoked' then
  return 0
end
current['status'] = 'revoked'
redis.call('SET', KEYS[1], cjson.encode(current))
return 1
`;

export const INCREMENT_API_KEY_USAGE_SCRIPT = `
local raw = redis.call('GET', KEYS[1])
if not raw then
  return 0
end
local current = cjson.decode(raw)
if current['status'] ~= 'active' then
  return 0
end
current['usageCount'] = current['usageCount'] + 1
current['lastUsedAt'] = ARGV[1]
redis.call('SET', KEYS[1], cjson.encode(current))
return 1
`;
