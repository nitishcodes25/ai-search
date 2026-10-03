import {redisClient} from './client.js';

export async function checkRedisConnection(){
    await redisClient.ping()
}