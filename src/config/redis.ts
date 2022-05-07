import * as redis from "redis"


const redis_client = redis.createClient({
    url:process.env.REDIS_URI
})

redis_client.on("error",()=>{
    process.exit(1)
})

redis_client.on("ready",()=>{
    console.log("Redis connected")
})

export default redis_client;