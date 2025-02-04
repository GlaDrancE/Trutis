import * as redis from 'redis';

const redisClient = redis.createClient();
const clientConnect = async () => {
    try {
        redisClient.on("error", (error) => {
            console.error("Redis Client Error:", error);
        });
        redisClient.on('connect', () => {
            console.log("redis connected")
        })
        console.log("Redis client connected successfully");
        return redisClient;
    } catch (error) {
        console.error("Failed to connect to Redis:", error);
        throw error;
    }
};

export const client = async () => {
    try {
        const redisClient = await clientConnect();
        return redisClient;
    } catch (error) {
        console.error("Error in client function:", error);
        throw error;
    }
};