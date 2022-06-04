import { AboutDataProps } from "../../types/about";
import BaseTestService from "../BaseService";



class AboutMainTestService extends BaseTestService{
    url = "/about"
    token:string=""
    mainData!: AboutDataProps;

    beforeAll() {
        cy.fixture("about/create")
            .then(data=>{
                this.mainData = data
            })
        return cy.signIn()
            .then(res=>{
                this.token = res.token
            })
    }


    


}

export default AboutMainTestService;