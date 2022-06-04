import BaseTestService from "../BaseService";
import {Document} from "mongoose"
import { NewsDataProps } from "../../types/news";

class NewsMainTestService extends BaseTestService{
    mainData!:NewsDataProps
    url = "/news"
    token!:string
    id:Document["_id"]

    beforeAll(){
        cy.fixture("news/create")
            .then(data=>{
                this.mainData = data
            })

        return cy.signIn()
            .then((res)=>{
                this.token = res.token
            })
        
    }

    afterAll():Cypress.Chainable{
        cy.getRequest(`/news/uz?title=${this.mainData.body.title}&short_desc=${this.mainData.body.short_desc}`)
        .then(res=>{
            res.body.data.data.forEach((one:{_id:string})=>{
                cy.deleteRequest(`/news/${one._id}/uz`,this.token)
            })
        })
        return cy.log("End")
    }

    
}
export default NewsMainTestService;