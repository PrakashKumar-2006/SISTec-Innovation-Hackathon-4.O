/**
 * utils/redisClient.js
 * ─────────────────────────────────────────────────────────────────────────────
 * PHASE 3: Centralized Redis client for distributed rate limiting.
 *
 * Design goals:
 *   1. Single ioredis client shared across all limiters (authLimiter,
 *      registrationLimiter, publicLimiter) — no duplicate connections.
 *   2. Graceful fallback: if REDIS_URL is not configured or the connection
 *      fails, all limiters silently fall back to express-rate-limit's default
 *      MemoryStore. This keeps the server working in local dev without Redis.
 *   3. Connection events are logged so ops engineers can see Redis health at
 *      a glance in the server log.
 *
 * Usage:
 *   const { createRedisStore } = require('./utils/redisClient');
 *   // Pass createRedisStore('rl:prefix:') to a rateLimit({ store: ... }) call.
 *   // Returns undefined (MemoryStore fallback) when Redis is not available.
 */

const Redis = require('ioredis');
const { RedisStore } = require('rate-limit-redis');

let redisClient = null;

const REDIS_URL = process.env.REDIS_URL;
// e.g. redis://localhost:6379  or  rediss://:password@hostname:6380

if (REDIS_URL) {
  try {
    redisClient = new Redis(REDIS_URL, {
      // Limit retry storms on connection failure
      maxRetriesPerRequest: 1,
      retryStrategy: (times) => {
        if (times > 3) {
          console.warn('[Redis] Could not connect after 3 retries — rate limiters will fall back to MemoryStore.');
          return null; // Stop retrying
        }
        return Math.min(times * 200, 1000); // Exponential backoff up to 1s
      },
      enableReadyCheck: false,
      lazyConnect: false,
    });

    redisClient.on('connect',     () => console.log('[Redis] Connected successfully.'));
    redisClient.on('ready',       () => console.log('[Redis] Client is ready.'));
    redisClient.on('error',       (err) => console.error('[Redis] Client error:', err.message));
    redisClient.on('close',       () => console.warn('[Redis] Connection closed.'));
    redisClient.on('reconnecting',() => console.log('[Redis] Reconnecting...'));
  } catch (err) {
    console.error('[Redis] Failed to initialize Redis client:', err.message);
    redisClient = null;
  }
} else {
  console.warn(
    '[Redis] REDIS_URL is not set in .env\n' +
    '        Rate limiters will use in-process MemoryStore (fine for single-instance dev).\n' +
    '        For production / load-balanced deployments, add:\n' +
    '          REDIS_URL=redis://localhost:6379\n' +
    '        or your Upstash / Redis Cloud connection string.'
  );
}

/**
 * Creates a rate-limit-redis store if Redis is available.
 * Returns undefined when Redis is not configured — express-rate-limit then
 * automatically falls back to its built-in MemoryStore.
 *
 * @param {string} prefix  Unique key prefix per limiter (e.g. 'rl:auth:')
 * @returns {RedisStore|undefined}
 */
const createRedisStore = (prefix) => {
  if (!redisClient) return undefined;
  return new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
    prefix,
  });
};

module.exports = { redisClient, createRedisStore };
