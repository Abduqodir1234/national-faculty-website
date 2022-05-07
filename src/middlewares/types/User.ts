export interface UserRegisterDataDocument{
    email:string;
    fullname:string;
    password:string;
    confirm_password:string;
    role?:"admin" | "user" | "teacher"
} 

export interface LoginData{
    email:string;
}