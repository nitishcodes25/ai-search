import { createClient } from "redis";
import {env} from '../../config/env.js';
import {logger} from '../../config/logger.js'

export const redisClient = createClient({
    url: env.REDIS_URL
})

redisClient.on("error",(error)=>{
    logger.error("Redis client error:",error);
})

export const connectRedis = async() => {
    if(!redisClient.isOpen){
        await redisClient.connect()
    }
}