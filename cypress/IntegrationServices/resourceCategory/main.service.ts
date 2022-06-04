import BaseTestService from "../BaseService";
import {Document} from "mongoose"
import { ResourceCategoryDataProps } from "../../types/resourceCategory";

class ResourceCategoryMainTestService extends BaseTestService{
    mainData!:ResourceCategoryDataProps
    url = "/resource/category"
    token!:string
    id:Document["_id"]

    beforeAll(){
        cy.fixture("resourceCategory/create")
            .then(data=>{
                this.mainData = data
            })

        return cy.signIn()
            .then((res)=>{
                this.token = res.token
            })
        
    }

    afterAll():Cypress.Chainable{
        cy.getRequest(`/resource/category/uz?name=${this.mainData.body.name}`)
        .then(res=>{
            res?.body?.data?.data?.forEach((one:{_id:string})=>{
                cy.deleteRequest(`/resource/category/${one._id}/uz`,this.token)
            })
        })
        return cy.log("End")
    }

    
}
export default ResourceCategoryMainTestService;