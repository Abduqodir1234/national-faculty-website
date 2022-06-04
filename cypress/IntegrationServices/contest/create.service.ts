import { ContestDataProps } from "../../types/contest";
import BaseTestService from "../BaseService";



class ContestCreateTestService extends BaseTestService{
    url = "contest"
    token:string=""
    mainData!: ContestDataProps;
    img!:File

    beforeAll() {
        cy.fixture("contest/create")
            .then(data=>{
                this.mainData = data
            })
        
        cy.imageReturner()
            .then(data=>this.img=data)

        return cy.signIn()
            .then(res=>{
                this.token = res.token
            })
    }


    afterAll(){
        return cy.getRequest(`${this.url}/${this.supportedLangs[0]}?title=${this.mainData.body.title}`)
            .then(res=>{
                    cy.deleteRequest(`${this.url}/${res.body.data.data[0]._id}/uz`,this.token)
            })
    }

}

export default ContestCreateTestService;