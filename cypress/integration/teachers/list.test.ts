import { TeacherDataProps } from "../../types/teachers"
import "../../support/commands"
import TeachersMainTestService from "../../IntegrationServices/teachers/main.service"

describe("News List API tests",()=>{

    const service = new TeachersMainTestService()
    let url = `${service.url}/${service.supportedLangs[0]}`
    before(()=>{
       service.beforeAll()
       .then(()=>{
           return cy.teacherCreate2(service.token,service.departmentId)
       })
       .then(teacherId=>{
           service.id = teacherId
       })
    })


    after(()=>{
        service.afterAll()
    })

    it("check get api",()=>{
        service.testListSuccess(url)
    })

    it("check list search with departmentId",()=>{
        service.testListQuerySearch(`${url}?departmentId=${service.departmentId}`)
    })

    it("check list search with educationTitle",()=>{
        service.testListSuccess(`${url}?educationTitle=${service.mainData.body.educationTitle}`)
    })

    it("check list search with email",()=>{
        service.testListSuccess(`${url}?email=${service.mainData.body.email}`)
    })

    it("check list search with fullname",()=>{
        service.testListSuccess(`${url}?fullname=${service.mainData.body.fullname}`)
    })

    it("language check for supported languages",()=>{
        service.langCheckForSupportedLangsInList(`${service.url}`)
    })

    it("send request without language in url",()=>{
        service.requestWithoutLangInUrl("GET",`${service.url}`)
    })

    it("language check for unsupported languages",()=>{
        service.langCheckForUnSupportedLangs("GET",`${service.url}`)
    })

})