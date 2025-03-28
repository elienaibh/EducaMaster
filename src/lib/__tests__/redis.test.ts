import { getCache, setCache, deleteCache, generateCacheKey, invalidatePattern } from '../redis';

describe('Redis Cache Utils', () => {
  const testKey = 'test:key';
  const testValue = { name: 'Test', value: 123 };

  beforeEach(async () => {
    // Limpa o cache antes de cada teste
    await deleteCache(testKey);
  });

  it('should set and get cache', async () => {
    await setCache(testKey, testValue);
    const cached = await getCache<typeof testValue>(testKey);
    expect(cached).toEqual(testValue);
  });

  it('should return null for non-existent key', async () => {
    const cached = await getCache<typeof testValue>('non:existent:key');
    expect(cached).toBeNull();
  });

  it('should delete cache', async () => {
    await setCache(testKey, testValue);
    await deleteCache(testKey);
    const cached = await getCache<typeof testValue>(testKey);
    expect(cached).toBeNull();
  });

  it('should invalidate pattern', async () => {
    const keys = ['test:1', 'test:2', 'test:3'];
    const values = [1, 2, 3];

    // Set multiple values
    await Promise.all(keys.map((key, index) => setCache(key, values[index])));

    // Invalidate all test:* keys
    await invalidatePattern('test:*');

    // Check if all keys were invalidated
    const results = await Promise.all(keys.map(key => getCache<number>(key)));

    expect(results.every(result => result === null)).toBe(true);
  });

  it('should generate consistent cache keys', () => {
    const key1 = generateCacheKey('user', '123', 'profile');
    const key2 = generateCacheKey('user', '123', 'profile');

    expect(key1).toBe('user:123:profile');
    expect(key1).toBe(key2);
  });
});
