import BaseTestService from "../BaseService";
import {Document} from "mongoose"
import { TalentedStudentsDataTypes } from "../../types/talentedStudents";

class TalentedStudentsMainTestService extends BaseTestService{
    mainData!:TalentedStudentsDataTypes
    url = "/students/talented"
    token!:string
    id:Document["_id"]
    majorId:Document["_id"]
    photo!:File

    beforeAll(){
        cy.fixture("talentedStudents/create")
            .then(data=>{
                this.mainData = data
            })
        
        cy.imageReturner()
            .then(img=>{
                this.photo = img
            })

        
        return cy.signIn()
            .then((res)=>{
                this.token = res.token
                cy.majorCreate(res.token)
                    .then(majorId=>{
                        this.majorId = majorId
                    })
            })
        
    }

    afterAll():Cypress.Chainable{
        cy.deleteRequest(`majors/${this.majorId}/uz`,this.token)
        cy.deleteRequest(`${this.url}/${this.id}/uz`,this.token)
        return cy.log("End")
    }
    
}
export default TalentedStudentsMainTestService;