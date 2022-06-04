import BaseTestService from "../BaseService";
import {Document} from "mongoose"
import { DepartmentSubjectsDataProps } from "../../types/departmentSubject";
import { MainInfosDataProps } from "../../types/mainInfos";

class MainInfosMainTestService extends BaseTestService{
    mainData!:MainInfosDataProps
    url = "/main/infos"
    token!:string
    id:Document["_id"]
    oldData!:MainInfosDataProps["updateOldDataProps"]

    beforeAll(){
        cy.fixture("mainInfos/create")
            .then(data=>{
                this.mainData = data
            })

        return cy.signIn()
            .then((res)=>{
                this.token = res.token
            })
        
    }

    afterAll():Cypress.Chainable{
        
        return cy.log("End")
    }

    
}
export default MainInfosMainTestService;