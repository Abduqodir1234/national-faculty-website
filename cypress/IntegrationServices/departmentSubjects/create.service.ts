import { DepartmentSubjectsDataProps } from "../../types/departmentSubject";
import BaseTestService from "../BaseService";



class DepartmentSubjectsCreateTestService extends BaseTestService{
    url = "/department/subject"
    departmentId:string=""
    subjectId:string=""
    token:string=""
    mainData!: DepartmentSubjectsDataProps;

    beforeAll() {
        cy.fixture("departmentSubject/create")
            .then(data=>{
                this.mainData = data
            })


        cy.signIn()
            .then(res=>{
                this.token = res.token
                cy.departmentCreate(res.token)
                    .then(depId=>{
                        this.departmentId = depId
                        cy.subjectCreate(res.token)
                            .then(subjectId=>{
                                this.subjectId = subjectId
                            })

                    })
                
            })
    }


    afterAll(){
        cy.deleteRequest(`department/${this.departmentId}/${this.supportedLangs[0]}`,this.token)
        cy.deleteRequest(`subject/${this.subjectId}/uz`,this.token)
        cy.getRequest(`${this.url}/${this.supportedLangs[0]}?departmentId=${this.departmentId}&subjectId=${this.subjectId}`)
            .then(res=>{
                cy.deleteRequest(`/department/subject/${res.body.data.data[0]._id}/uz`,this.token)
            })
    }

    


}

export default DepartmentSubjectsCreateTestService;