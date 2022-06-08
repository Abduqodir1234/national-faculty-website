import { Router } from "express";
import swaggerUI from "swagger-ui-express"
import swaggerJsDoc from "swagger-jsdoc"
import path from "path";

const swaggerRouter = Router()

const PORT = process.env.PORT || 5000


const swaggerInitialDoc =swaggerJsDoc({
    swaggerDefinition: {
        openapi: '3.0.0',
        servers: [
          { 
            url: 'http://localhost:{port}/api/v1',
            description: 'local server',
            variables: {
              port: {
                enum: [PORT],
                default: PORT
              },
            }
          }
        ],  
        info: {
          version: '1.0.0',
          title: 'Faculty website APIs',
          description: 'Documentation for APIs of Faculty website'
        },
        components: {
            securitySchemes:{
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            }
          }
        }
      },
      apis: [`${path.join(__dirname,"../../","controllers/swagger/components/*.yaml")}`,`${path.join(__dirname,"../../","controllers/swagger/docs/**/*.yaml")}`]    
}) 


swaggerRouter.use("/",swaggerUI.serve,swaggerUI.setup(swaggerInitialDoc))
  
export default swaggerRouter;                                              