import BaseTestService from "../BaseService";
import {Document} from "mongoose"
import { SubjectDataProps } from "../../types/subject";

class SubjectMainTestService extends BaseTestService{
    mainData!:SubjectDataProps
    url = "/subject"
    token!:string
    id:Document["_id"]

    beforeAll(){
        cy.fixture("subject/create")
            .then(data=>{
                this.mainData = data
            })

        return cy.signIn()
            .then((res)=>{
                this.token = res.token
            })
        
    }

    afterAll():Cypress.Chainable{
        cy.getRequest(`/subject/uz?name=${this.mainData.body.name}`)
            .then(res=>{
                res.body.data.data.forEach((one:{_id:string})=>{
                    cy.deleteRequest(`/subject/${one._id}/uz`,this.token)
                })
            })
        return cy.log("End")
    }

    
}
export default SubjectMainTestService;