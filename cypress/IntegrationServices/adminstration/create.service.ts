import { AdminstrationDataProps } from "../../types/adminstation";
import BaseTestService from "../BaseService";



class AdminstrationCreateTestService extends BaseTestService{
    url = "adminstration"
    departmentId!:string
    teacherId!:string
    token:string=""
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
        cy.deleteRequest(`department/${this.departmentId}/uz`,this.token)
        cy.deleteRequest(`teacher/${this.teacherId}/uz`,this.token)
        return cy.getRequest(`/adminstration/uz?teacherId=${this.teacherId}&departmentId=${this.departmentId}`)
            .then(res=>{
                    cy.deleteRequest(`/adminstration/${res.body.data.data[0]._id}/uz`,this.token)
            })
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

export default AdminstrationCreateTestService;