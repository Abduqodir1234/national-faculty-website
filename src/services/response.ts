class ResponseService{
    static setResponse(status=200,message:string,error:boolean,data:any=null){
        return {
            status,
            message,
            error,
            data
        }
    }

    static notFound(){
        return{
            status:404,
            error:true,
            message:"Not found",
            data:null
        }
    }

    static created(){
        return{
            status:201,
            error:false,
            message:"created",
            data:null
        }
    }

    static updated(){
        return{
            status:200,
            error:false,
            message:"Updated",
            data:null
        }
    }

    static deleted(){
        return{
            status:200,
            error:false,
            message:"Deleted",
            data:null
        }
    }

    static badRequest(msg:any){
        return{
            status:400,
            error:true,
            message:msg,
            data:null
        }
    }

    static notAuthenticated(msg:any){
        return{
            status:403,
            error:true,
            message:msg.message,
            data:null
        }
    }

    static internalServerError(msg:any){
        return{
            status:500,
            error:true,
            message:msg.message,
            data:null
        }
    }

    static responseOK(msg:any,data:any=null){
        return{
            status:200,
            error:false,
            message:msg,
            data
        }
    }

    static responseWithData(data:any,msg:string=""){
        return{
            status:200,
            error:false,
            message:msg,
            data
        }
    }
}

export default ResponseService;