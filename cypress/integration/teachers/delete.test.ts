import TeachersMainTestService from "../../IntegrationServices/teachers/main.service"
import "../../support/commands"

describe("Teacher Delete API tests",()=>{
    const service = new TeachersMainTestService()
    let url!:string
    before(()=>{
       service.beforeAll()
       .then(()=>{
           return cy.teacherCreate2(service.token,service.departmentId)
       })
       .then(teacherId=>{
           service.id = teacherId
           url = `${service.url}/${teacherId}/${service.supportedLangs[0]}`
       })
    })


    after(()=>{
        service.afterAll()
    })

    it("check delete api with nonexist id",()=>{
        service.testWithNonExistId("DELETE",`${service.url}`,service.token)
    })
    
    it("check delete api",()=>{
        service.testDeleteSuccess(url,service.token)
    })

    it("language check for supported languages",()=>{
        service.langCheckForSupportedLangsInDelete(`${service.url}/${service.id}`)
    })

    it("send request without language in url",()=>{
        service.requestWithoutLangInUrl("DELETE",`${service.url}/${service.id}`)
    })

    it("language check for unsupported languages",()=>{
        service.langCheckForUnSupportedLangs("DELETE",`${service.url}/${service.id}`)
    })

    it("delete without token",()=>{
        service.testRequestWithNoToken(
            "DELETE",
            url,
        )
    })

})