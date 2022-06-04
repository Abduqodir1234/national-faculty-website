import BaseTestService from "../BaseService";
import {Document} from "mongoose"
import { ResourcesDataProps } from "../../types/resources";

class ResourcesMainTestService extends BaseTestService{
    mainData!:ResourcesDataProps
    url = "/resources"
    token!:string
    id:Document["_id"]
    resourceCategoryId!:string

    beforeAll(){
        cy.fixture("resources/create")
            .then(data=>{
                this.mainData = data
            })
        
        

        return cy.signIn()
            .then((res)=>{
                this.token = res.token
                cy.resourceCategoryCreate(this.token)
                    .then(resourceCategoryId=>{
                        this.resourceCategoryId = resourceCategoryId
                    })
            })
        
    }

    afterAll():Cypress.Chainable{
        cy.deleteRequest(`resource/category/${this.resourceCategoryId}/uz`,this.token)
        cy.getRequest(`/resources/uz?title=${this.mainData.body.title}`)
            .then(res=>{
                res.body.data.data.forEach((one:{_id:string})=>{
                    cy.deleteRequest(`/resources/${one._id}/uz`,this.token)
                })
            })
        return cy.log("End")
    }

    
}
export default ResourcesMainTestService;