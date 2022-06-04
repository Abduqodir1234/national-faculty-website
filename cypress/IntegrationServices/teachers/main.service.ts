import BaseTestService from "../BaseService";
import {Document} from "mongoose"
import { TeacherDataProps } from "../../types/teachers";

class TeachersMainTestService extends BaseTestService{
    mainData!:TeacherDataProps
    url = "/teacher"
    token!:string
    id:Document["_id"]
    departmentId:Document["_id"]

    beforeAll(){
        cy.fixture("teachers/create")
            .then(data=>{
                this.mainData = data
            })

        return cy.signIn()
            .then((res)=>{
                this.token = res.token
                return cy.departmentCreate(res.token)
            })
            .then((departmentId)=>{
                this.departmentId = departmentId
            })
    }

    afterAll():Cypress.Chainable{
        cy.deleteRequest(`department/${this.departmentId}/uz`,this.token)
        cy.getRequest(`/teacher/uz?fullname=${this.mainData.body.fullname}`)
        .then(res=>{
            res?.body?.data?.data?.forEach((one:{_id:string})=>{
                cy.deleteRequest(`/teacher/${one._id}/uz`,this.token)
            })
        })
        return cy.log("End")
    }

    
}
export default TeachersMainTestService;