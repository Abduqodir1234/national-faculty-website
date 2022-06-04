import BaseTestService from "../BaseService";
import {Document} from "mongoose"
import { MajorsDataProps } from "../../types/majors";

class MajorsMainTestService extends BaseTestService{
    mainData!:MajorsDataProps
    url = "/majors"
    token!:string
    id:Document["_id"]

    beforeAll(){
        cy.fixture("majors/create")
            .then(data=>{
                this.mainData = data
            })

        return cy.signIn()
            .then((res)=>{
                this.token = res.token
            })
        
    }

    afterAll():Cypress.Chainable{
        cy.getRequest(`/majors/uz?name=${this.mainData.body.name}`)
        .then(res=>{
            res?.body?.data?.data?.forEach((one:{_id:string})=>{
                cy.deleteRequest(`/majors/${one._id}/uz`,this.token)
            })
        })
        return cy.log("End")
    }

    
}
export default MajorsMainTestService;