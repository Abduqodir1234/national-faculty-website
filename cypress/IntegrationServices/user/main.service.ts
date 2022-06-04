import BaseTestService from "../BaseService";
import {Document} from "mongoose"
import { RegisterDataProps } from "../../types/user";

class UserMainTestService extends BaseTestService{
    mainData!:RegisterDataProps
    url = "/user"
    token!:string
    id:Document["_id"]

    beforeAll(){
        cy.fixture("/user/register.json")
            .then(data=>{
                this.mainData = data
            })

        return cy.signIn()
            .then((res)=>{
                this.token = res.token
            })
        
    }

    afterAll():Cypress.Chainable{
        cy.task("removeUsers2")
            .then((res)=>{
                console.log(res);
            })
        return cy.log("End")
    }


    getUser(){
        cy.getRequest(`${this.url}/${this.supportedLangs[0]}`,this.token)
            .then(res=>{
                expect(res.status).to.eq(200)
                expect(res.body.error).to.eq(false)
                expect(res.body.data._id).exist
            })
    }

    requestWithLangInUrlInGettingUser(){
        cy.getRequest(`${this.url}/${this.supportedLangs[0]}`,this.token)
            .then(res=>{
                expect(res.status).to.eq(200)
                expect(res.body.error).to.eq(false)
                expect(res.body.data._id).exist
            })
    }
    
}
export default UserMainTestService;