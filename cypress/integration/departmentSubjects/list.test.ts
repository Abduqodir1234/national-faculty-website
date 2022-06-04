import DepartmentMajorsMainTestService from "../../IntegrationServices/departmentMajors/main.service"
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

    it("check get api",()=>{
        service.testListSuccess(`${service.url}/${service.supportedLangs[0]}`)
    })

    it("check get api with subjectId",()=>{
        service.testListQuerySearch(`${service.url}/${service.supportedLangs[0]}?subjectId=${service.subjectId}`)
    })

    it("check get api with departmentId",()=>{
        service.testListQuerySearch(`${service.url}/${service.supportedLangs[0]}?departmentId=${service.departmentId}`)
    })


    it("language check for supported languages",()=>{
        service.langCheckForSupportedLangsInList(`${service.url}`)
    })

    it("send request without language in url",()=>{
        service.requestWithoutLangInUrlInSomeExceptions("GET",`${service.url}`)
    })

    it("language check for unsupported languages",()=>{
        service.langCheckForUnSupportedLangs("GET",`${service.url}`)
    })

})