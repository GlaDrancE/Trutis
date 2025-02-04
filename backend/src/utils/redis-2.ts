import { Redis } from 'ioredis'
class RedisCaching {
    private client;
    private config;

    constructor(config = {}) {
        const defaultConfig = {
            host: process.env.REDIS_HOST || 'localhost',
            port: process.env.REDIS_PORT || 3000,
            password: process.env.REDIS_PASSWORD,
            keyPrifix: "api:",
            defaultTTL: 3600
        }
        this.config = { ...defaultConfig, ...config };
        this.client = new Redis();
        this.client.on("connect", () => {
            console.log("Connection established successfully")
        })
        this.client.on("error", (error) => {
            console.error("Failed to established connection: ", error)
        })
    }

    async set(key: string, value: any, ttl = this.config.defaultTTL) {
        try {
            const serializedValue = JSON.stringify(value);
            if (ttl) {
                this.client.setex(key, serializedValue, ttl)
            } else {
                this.client.set(key, serializedValue);
            }
            return true
        } catch (error) {
            console.log("Error while setting cache: ", error)
            return false
        }
    }
    async get({ key }: any) {
        try {
            const value = await this.client.get(key);
            return value ? JSON.stringify(value) : null;
        } catch (error) {
            console.log("Error while getting cache: ", error)
            return null
        }
    }
}

export default RedisCaching;