import {Router} from "express";
import userRoutes from "./user/routes";
import teacherRoutes from "./teacher/routes";
import departmentRoutes from "./department/routes";
import subjectRoutes from "./subjects/routes";
import departmentSubjectRoutes from "./departmentSubject/routes";
import newsRoutes from "./news/routes";
import mainInfosRoutes from "./main/routes";
import adminstrationRoutes from "./adminstration/routes";
import majorRoutes from "./majors/routes";
import departmentMajorsRoutes from "./departmentMajors/routes";
import contestRoutes from "./contest/routes";
import resourceCategoryRoutes from "./resourceCategory/routes";
import resourcesRoutes from "./resources/routes";
import aboutRoutes from "./about/routes";
import studentRoutes from "./talented/routes";

const IndexRouter = Router()

IndexRouter.use("/user",userRoutes)
IndexRouter.use("/teacher",teacherRoutes)
IndexRouter.use("/department/subject",departmentSubjectRoutes)
IndexRouter.use("/department/majors",departmentMajorsRoutes)
IndexRouter.use("/department",departmentRoutes)
IndexRouter.use("/subject",subjectRoutes)
IndexRouter.use("/news",newsRoutes)
IndexRouter.use("/main/infos",mainInfosRoutes)
IndexRouter.use("/adminstration/",adminstrationRoutes)
IndexRouter.use("/majors/",majorRoutes)
IndexRouter.use("/contest/",contestRoutes)
IndexRouter.use("/resource/category",resourceCategoryRoutes)
IndexRouter.use("/resources",resourcesRoutes)
IndexRouter.use("/about",aboutRoutes)
IndexRouter.use("/students/talented",studentRoutes)



export default IndexRouter;