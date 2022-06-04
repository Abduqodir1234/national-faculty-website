import { DepartmentMajorsDataProps } from "../../types/departmentMajors";
import BaseTestService from "../BaseService";



class DepartmentMajorsCreateTestService extends BaseTestService{
    url = "/department/majors"
    departmentId:string=""
    majorId:string=""
    token:string=""
    mainData!: DepartmentMajorsDataProps;

    beforeAll() {
        cy.fixture("departmentMajors/create")
            .then(data=>{
                this.mainData = data
            })
        cy.signIn()
            .then(res=>{
                this.token = res.token
                cy.departmentCreate(res.token)
                    .then(depId=>{
                        this.departmentId = depId
                        cy.majorCreate(res.token)
                            .then(majorId=>{
                                this.majorId = majorId
                            })

                    })
                
            })
    }


    afterAll(){
        cy.deleteRequest(`department/${this.departmentId}/uz`,this.token)
        cy.deleteRequest(`majors/${this.majorId}/uz`,this.token)
        cy.getRequest(`/department/majors/uz?code=${this.mainData?.body.code}`)
            .then(res=>{
                cy.deleteRequest(`/department/majors/${res.body.data.data[0]._id}/uz`,this.token)
            })
    }

    


}

export default DepartmentMajorsCreateTestService;