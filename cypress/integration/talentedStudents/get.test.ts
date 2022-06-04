import TalentedStudentsMainTestService from "../../IntegrationServices/talentedStudents/main.service"

describe("Department Subjects Get API tests",()=>{
    const service = new TalentedStudentsMainTestService()

    before(()=>{
        service.beforeAll()
            .then(()=>{
                cy.talentedStudentsCreate(service.token,service.majorId,service.photo)
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
        service.testGetByIdSuccess(`${service.url}/${service.id}/${service.supportedLangs[0]}`)
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