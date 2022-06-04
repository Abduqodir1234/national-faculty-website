import { DepartmentMajorsDataProps } from "../../types/departmentMajors";
import BaseTestService from "../BaseService";
import {Document} from "mongoose"

class DepartmentMajorsMainTestService extends BaseTestService{
    mainData!:DepartmentMajorsDataProps
    url = "/department/majors"
    token!:string
    id:Document["_id"]
    departmentId!:Document["_id"]
    majorId:Document["_id"]

    beforeAll(){
        cy.fixture("departmentMajors/create")
            .then(data=>{
                this.mainData = data
            })

        
        return cy.signIn()
            .then((res)=>{
                this.token = res.token
                this.majorAndDepartmentCreate(res.token)
            })
        
    }

    afterAll():Cypress.Chainable{
        cy.deleteRequest(`/majors/${this.majorId}/uz`,this.token)
        cy.deleteRequest(`/department/${this.departmentId}/uz`,this.token)
        cy.deleteRequest(`/department/majors/${this.id}/uz`,this.token)
        return cy.log("End")
    }

    private majorAndDepartmentCreate(token:string){
        return cy.majorCreate(token)
            .then(majorId=>{
                this.majorId = majorId
                return cy.departmentCreate(token)
                    .then(departmentId=>{
                        this.departmentId = departmentId;
                    })
            })
    }
    
}
export default DepartmentMajorsMainTestService;