import multer from "multer"
import path from "path"
import md5 from "md5"
// file uploads
const store = multer.diskStorage({
    destination:(req:any, file:any, cb:any)=>{
        cb(null, './src/public/uploads/')
    },
    filename: (req:any, file:any, cb:any)=>{
        let ext = path.extname(file.originalname)
        cb(null,  md5(Date()) + ext)
    },

})

const upload = multer ({
    storage: store,
    fileFilter: (req ,file,cb)=>{
        let ext = path.extname(file.originalname)
        if(ext == '.jpg' || ext == '.png'|| ext === ".svg"|| ext === ".jpeg" ){
            cb(null, true)
        }else{
            cb(new Error("Only png svg jpg jpeg is accepted"))
        }
    },
})


export const uploadFile = multer ({
    storage: store
})


export default upload;