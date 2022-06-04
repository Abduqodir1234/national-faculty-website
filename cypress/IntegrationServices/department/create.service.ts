import { DepartmentDataProps } from "../../types/department";
import BaseTestService from "../BaseService";

class DeprtmentTestService extends BaseTestService{
    url = "department"
    token:string=""
    mainData!: DepartmentDataProps;
    img!:File
    id!:string

    beforeAll(){
        cy.fixture("department/create")
            .then(data=>{
                this.mainData = data
            })
        return cy.signIn()
                .then((res)=>{
                    this.token = res.token
                })
    }

    afterAll(){
        return cy.getRequest(`/department/uz?name=${this.mainData.body.name}`)
            .then(res=>{
                res?.body?.data?.data?.forEach((one:{_id:string})=>{
                    cy.deleteRequest(`/department/${one._id}/uz`,this.token)
                })
            })
    }
}

export default DeprtmentTestService;