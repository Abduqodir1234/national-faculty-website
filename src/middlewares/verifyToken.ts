import {NextFunction, Request, Response} from "express";
import decode from "./decode";
import {RequestWithUser} from "./types/RequestWithUser";
import redis_client from "../config/redis";

const verifyToken = async (req:RequestWithUser,res:Response,next:NextFunction) => {
    try{
        const token = req.headers['authorization']?.split("Bearer ")[1]
        if(!token) return res.status(403).json({error:true,message:"No token"})
        const {error,data} = await decode(token)
        if(error) return res.status(403).json({error:true,message:"Invalid token"})
        const redisToken = await redis_client.get(data?.sub?._id) as string
        if(redisToken !== token) return res.status(403).json({error:true,message:"Invalid token"})
        if(!redisToken) return res.status(403).json({error:true,message:"Invalid token"})
        req.user = data?.sub
        next()
    } catch (e) {
        return res.status(403).json({error:true,message:"Unauthenticated"})
    }
}

export default verifyToken;