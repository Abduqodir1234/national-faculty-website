import BaseTestService from "../BaseService";
import {Document} from "mongoose"
import { DepartmentSubjectsDataProps } from "../../types/departmentSubject";

class DepartmentSubjectMainTestService extends BaseTestService{
    mainData!:DepartmentSubjectsDataProps
    url = "/department/subject"
    token!:string
    id:Document["_id"]
    departmentId!:Document["_id"]
    subjectId:Document["_id"]

    beforeAll(){
        cy.fixture("departmentSubject/create")
            .then(data=>{
                this.mainData = data
            })

        
        return cy.signIn()
            .then((res)=>{
                this.token = res.token
                this.subjectAndDepartmentCreate(res.token)
            })
        
    }

    afterAll():Cypress.Chainable{
        cy.deleteRequest(`/subject/${this.subjectId}/uz`,this.token)
        cy.deleteRequest(`/department/${this.departmentId}/uz`,this.token)
        cy.deleteRequest(`/department/subject/${this.id}/uz`,this.token)
        return cy.log("End")
    }

    private subjectAndDepartmentCreate(token:string){
        return cy.subjectCreate(token)
            .then(subjectId=>{
                this.subjectId = subjectId
                return cy.departmentCreate(token)
                    .then(departmentId=>{
                        this.departmentId = departmentId;
                    })
            })
    }
    
}
export default DepartmentSubjectMainTestService;