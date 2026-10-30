import { Redis } from '@upstash/redis';
import { handleProgress, type ProgressStorage } from './_lib/progress-handler';

const KEY = 'progress:v1';

/** Base Upstash du Marketplace Vercel (variables KV_*), ou créée à part (UPSTASH_REDIS_*). */
function redisStorage(): ProgressStorage | null {
  const url = process.env['KV_REST_API_URL'] ?? process.env['UPSTASH_REDIS_REST_URL'];
  const token = process.env['KV_REST_API_TOKEN'] ?? process.env['UPSTASH_REDIS_REST_TOKEN'];
  if (!url || !token) return null;
  const redis = new Redis({ url, token });
  return {
    get: () => redis.get(KEY),
    set: async (document) => {
      await redis.set(KEY, document);
    },
  };
}

function handle(request: Request): Promise<Response> {
  return handleProgress(request, { storage: redisStorage, secret: process.env['PROGRESS_SECRET'] });
}

export const GET = handle;
export const PUT = handle;
