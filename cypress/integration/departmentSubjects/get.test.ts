
import DepartmentSubjectMainTestService from "../../IntegrationServices/departmentSubjects/main.service"

describe("Department Subjects Get API tests",()=>{
    const service = new DepartmentSubjectMainTestService()

    before(()=>{
        service.beforeAll()
            .then(()=>{
                cy.departmentSubjectCreate(service.token,service.departmentId,service.subjectId)
                .then(departmentSubjectId=>{
                    service.id = departmentSubjectId
                    
                })
            })
        
    })

    after(()=>{
        service.afterAll()
            .then(()=>null)
    })

    it("check get api with nonexist id",()=>{
        service.testWithNonExistId("GET",`${service.url}`)
    })
    
    it("check get api",()=>{
        service.testGetByIdSuccess(`${service.url}/${service.id}/uz`)
    })

    it("language check for supported languages",()=>{
        service.langCheckForSupportedLangsInGetById(`${service.url}/${service.id}`)
    })

    it("send request without language in url",()=>{
        service.requestWithoutLangInUrlInSomeExceptions("GET",`${service.url}/${service.id}`)
    })

    it("language check for unsupported languages",()=>{
        service.langCheckForUnSupportedLangs("GET",`${service.url}/${service.id}`)
    })
})