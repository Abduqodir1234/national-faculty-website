import {connect} from "mongoose"
import redis_client from "../config/redis";
const connectDbAndRedis = async() => {
    try{
        await redis_client.connect()
        await connect(process.env.MONGO_URI || "")
        console.log("Db connected")
    }
    catch{
        console.log("Db or Redis Error")
        process.exit(1)
    }
}
export default connectDbAndRedis;