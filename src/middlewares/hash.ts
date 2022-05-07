import bcrypt from "bcrypt";

const hash = async (item:string)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(item,salt)
        return {error:false,data:hashedPassword,msg:"",status:200}
    } catch (e) {
        return {error:true,data:{},msg:e,status:500}
    }
}
export default hash;