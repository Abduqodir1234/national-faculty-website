import * as dotenv from "dotenv"
import mongoose from "mongoose"
import Users from "../../src/models/user"

const removeUserFromDB = async() => {
    dotenv.config()      
    await mongoose.connect(process.env.MONGO_URI||"")
    const data = await Users.deleteMany({$or:[{email:"a2@gmail.com"},{email:"a9@gmail.com"}]})
    console.log(data);
    return "ok";
}
export default removeUserFromDB;
module.exports = removeUserFromDB