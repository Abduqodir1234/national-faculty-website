import express, {Application} from 'express'
import * as dotenv from "dotenv"
import notFound from "../middlewares/notFound";
import connectDbAndRedis from "../middlewares/connectDbAndRedis";
import cors from "cors"
import helmet from "helmet"
import rateLimiter from "express-rate-limit"
import corsOpts from "../middlewares/corsOptions";
import IndexRouter from "../routes";
export default async(app:Application) => {
    //Enable environment variables
    dotenv.config()

    //Port
    const port = process.env.PORT || 3000


    //Middlewares
    app.use(express.urlencoded({extended:true}))
    app.use(express.json())
    app.use(require("express-log-url"))
    app.use("/src/public/",express.static("./src/public/"))

    //For security reasons
    app.set("trust proxy",1)
    
    //Configure cors options
    app.use(cors(corsOpts))
    
    //sanitize user input coming from POST body, GET queries, and url params
    app.use(require("xss-clean")())
    
    //Helmet helps you secure your Express apps by setting various HTTP headers.
    app.use(helmet())
    
    //Use to limit repeated requests to public APIs
    app.use(rateLimiter({windowMs:1*1000,max:10000}))



    //Urls
    app.use("/api/v1",IndexRouter)
    app.use(notFound)


    //Start server
    await connectDbAndRedis()
    app.listen(port,()=>console.log(`Server is listening in PORT ${port}`))
}