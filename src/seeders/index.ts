import mongoose from "mongoose";
import Users from "../models/user";
import { aboutData, adminstrationDatas, contestDatas, departmentDatas, departmentMajorsData, departmentSubjectData, mainInfosData, majorDatas, newsData, resourceCategoryDatas, resourceData, subjectsData, talentedStudentsData, teacherData, userData } from "./data";
import * as dotenv from "dotenv"
import hash from "../middlewares/hash";
import News from "../models/news";
import About from "../models/about";
import MainInfos from "../models/main";
import ResourceCategory from "../models/resourceCategory";
import Resources, { ResourcesDocument } from "../models/resources";
import Subjects from "../models/subject";
import Contests from "../models/contest";
import Department from "../models/deparments";
import Teachers from "../models/teacher";
import DepartmentSubject from "../models/departmentSubject";
import Majors from "../models/majors";
import DepartmentMajors from "../models/departmentMajors";
import Adminstrations from "../models/adminstration";
import Talenteds from "../models/talented";

const runSeeders = async () => {
    try{
        dotenv.config()
        await mongoose.connect(process.env.MONGO_URI || "")
        await mongoose.connection.db.dropDatabase()
        const hashed = await hash(userData.password)
        await Users.create({...userData,password:hashed.data})
        await News.insertMany(newsData)
        await About.create(aboutData)
        await MainInfos.create(mainInfosData)
        await ResourceCategory.insertMany(resourceCategoryDatas)
        const resourceCategory:ResourcesDocument | null = await ResourceCategory.findOne({name_uz:"Qonunlar"})
        await Resources.insertMany(resourceData(resourceCategory?._id))
        await Subjects.insertMany(subjectsData)
        const subject = await Subjects.findOne({name_uz:"ELEKTRON TIJORAT"})
        await Contests.insertMany(contestDatas)
        await Department.insertMany(departmentDatas)
        const department = await Department.findOne({name_uz:"KOMPYUTER INJINIRINGI"})
        await Teachers.insertMany(teacherData(department._id))
        const teacher = await Teachers.findOne({fullname:"Sapayev Shoxnazar"})
        await DepartmentSubject.insertMany(departmentSubjectData(subject._id,department._id))
        await Majors.insertMany(majorDatas)
        const major = await Majors.findOne({name_uz:"Axborot texnologiyalari"})
        await DepartmentMajors.insertMany(departmentMajorsData(major._id,department._id))
        await Adminstrations.insertMany(adminstrationDatas(teacher._id,department._id))
        await Talenteds.insertMany(talentedStudentsData(major._id))
        console.log("Admin user created.\nemail:a@gmail.com\npassword:123456789\nKeep on!!!!!");
        process.exit(1)
    }
    catch(e){
        console.log(e);
        process.exit(1)
    }
} 

runSeeders()