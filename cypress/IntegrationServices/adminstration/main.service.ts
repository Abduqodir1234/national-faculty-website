import { AdminstrationDataProps } from "../../types/adminstation";
import BaseTestService from "../BaseService";



class AdminstrationMainTestService extends BaseTestService{
    url = "adminstration"
    departmentId!:string
    teacherId!:string
    token:string=""
    id!:string
    mainData!: AdminstrationDataProps;

    beforeAll() {
        cy.fixture("adminstration/create")
            .then(data=>{
                this.mainData = data
            })

        return cy.signIn()
            .then(res=>{
                this.token = res.token
                return this.departmentAndTeacherCreate()
                    .then(()=>null)
            })
    }


    afterAll(){
        cy.deleteRequest(`department/${this.departmentId}/${this.supportedLangs[0]}`,this.token)
        cy.deleteRequest(`teacher/${this.teacherId}/${this.supportedLangs[0]}`,this.token)
        return cy.deleteRequest(`/adminstration/${this.id}/${this.supportedLangs[0]}`,this.token) 
    }

    private departmentAndTeacherCreate(){
        return cy.departmentCreate(this.token)
                .then(depId=>{
                    this.departmentId = depId
                    cy.teacherCreate2(this.token,depId)
                        .then(teacherId=>{
                            this.teacherId = teacherId
                        })
                })
    }

    


}

export default AdminstrationMainTestService;