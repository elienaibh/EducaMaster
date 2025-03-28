import { Redis, RedisOptions } from 'ioredis';
import { logger } from '@/lib/logger';

interface CacheData<T> {
  data: T;
  expiresAt: number;
}

const redisOptions: RedisOptions = {
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD,
};

export class RedisCache {
  private redis: Redis;

  constructor() {
    this.redis = new Redis(redisOptions);
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await this.redis.get(key);
      if (!data) return null;

      const parsed = JSON.parse(data) as CacheData<T>;
      if (Date.now() > parsed.expiresAt) {
        await this.redis.del(key);
        return null;
      }

      return parsed.data;
    } catch (error) {
      logger.error('Redis get error:', error instanceof Error ? error : new Error(String(error)));
      return null;
    }
  }

  async set<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
    try {
      const data: CacheData<T> = {
        data: value,
        expiresAt: Date.now() + ttlSeconds * 1000,
      };
      await this.redis.set(key, JSON.stringify(data), 'EX', ttlSeconds);
    } catch (error) {
      logger.error('Redis set error:', error instanceof Error ? error : new Error(String(error)));
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.redis.del(key);
    } catch (error) {
      logger.error('Redis del error:', error instanceof Error ? error : new Error(String(error)));
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      const exists = await this.redis.exists(key);
      return exists === 1;
    } catch (error) {
      logger.error(
        'Redis exists error:',
        error instanceof Error ? error : new Error(String(error))
      );
      return false;
    }
  }

  async invalidatePattern(pattern: string): Promise<void> {
    try {
      const keys = await this.redis.keys(pattern);
      if (keys.length > 0) {
        await this.redis.del(...keys);
      }
    } catch (error) {
      logger.error(
        'Redis invalidate pattern error:',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }
}

// Instância global do Redis
const redisCache = new RedisCache();

export async function setCache<T>(
  key: string,
  value: T,
  expirationInSeconds = 3600
): Promise<void> {
  await redisCache.set(key, value, expirationInSeconds);
}

export async function getCache<T>(key: string): Promise<T | null> {
  return await redisCache.get<T>(key);
}

export async function deleteCache(key: string): Promise<void> {
  await redisCache.del(key);
}

export async function existsInCache(key: string): Promise<boolean> {
  return await redisCache.exists(key);
}

export async function invalidatePattern(pattern: string): Promise<void> {
  await redisCache.invalidatePattern(pattern);
}

// Funções de cache específicas
export async function cacheCoursePage(courseId: string, data: Record<string, unknown>) {
  await setCache(`course:${courseId}`, data, 3600); // Cache por 1 hora
}

export async function cacheBlogPost(postId: string, data: Record<string, unknown>) {
  await setCache(`post:${postId}`, data, 3600); // Cache por 1 hora
}

export async function cacheUserProfile(userId: string, data: Record<string, unknown>) {
  await setCache(`user:${userId}`, data, 1800); // Cache por 30 minutos
}

export async function invalidateUserCache(userId: string) {
  await invalidatePattern(`user:${userId}:*`);
}

export async function invalidateCourseCache(courseId: string) {
  await invalidatePattern(`course:${courseId}:*`);
}

export async function invalidateBlogCache(postId: string) {
  await invalidatePattern(`post:${postId}:*`);
}

// Função auxiliar para gerar chaves de cache consistentes
export function generateCacheKey(...parts: string[]): string {
  return parts.join(':');
}

// Exemplo de uso:
// const userKey = generateCacheKey('user', userId)
// const courseKey = generateCacheKey('course', courseId, 'lessons')