import { Request, Response, NextFunction } from 'express'
import { client } from './redis';
import RedisCaching from './redis-2';


const redisCache = new RedisCaching()

const Caching = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    try {
        const redisClient = await client();

        redisClient.on("error", (error: any) => { console.log("Error: ", error); })

        const cachedResult = await redisClient.get('clients')

        console.log(cachedResult)
        if (cachedResult) {
            res.status(200).json({ cachedResult })
        } else {
            next()
        }
    } catch (error) {

    }
}

export default Caching;