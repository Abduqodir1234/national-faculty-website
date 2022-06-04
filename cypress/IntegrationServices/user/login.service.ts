import BaseTestService from "../BaseService";
import {Document} from "mongoose"
import { LoginDataProps } from "../../types/user";

class UserLoginMainTestService extends BaseTestService{
    mainData!:LoginDataProps
    url = "/user/login"
    token!:string
    id:Document["_id"]

    beforeAll(){
        cy.fixture("/user/login.json")
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

    langCheckForSupportedLangsInLogin(){
        this.supportedLangs.forEach(one=>{
            cy.request({
                method:"POST",
                url:`${this.url}/${one}`,
                failOnStatusCode:false
            })
                .then(res=>{
                    expect(res.status).to.eq(400)
                    expect(res.body.error).to.eq(true)
                    expect(res.body.message).to.eq("\"email\" is required")
                })
        })  
    }
    
}
export default UserLoginMainTestService;