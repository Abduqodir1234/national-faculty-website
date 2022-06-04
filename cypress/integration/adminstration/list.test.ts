import AdminstrationMainTestService from "../../IntegrationServices/adminstration/main.service"
import "../../support/commands"
import { AdminstrationDataProps } from "../../types/adminstation"
import { SubjectDataProps } from "../../types/subject"


describe("Adminstration list API tests",()=>{
    const service = new AdminstrationMainTestService()
    let url=`${service.url}/${service.supportedLangs[0]}`

    
    before(()=>{
        service.beforeAll()
            .then(()=>{
                cy.adminstrationCreate(service.token,service.departmentId,service.teacherId)
                    .then(res=>{
                        service.id = res
                    })
            })
    })

    after(()=>{
        service.afterAll()
            .then(()=>null)
    })



    it("search with teacherId",()=>{
        service.testListSuccess(`${url}?teacherId=${service.teacherId}`)
    })


    it("search with departmentId",()=>{
        service.testListSuccess(`${url}?departmentId=${service.departmentId}`)
    })


    it("language check for supported languages",()=>{
        service.langCheckForSupportedLangsInList(`${service.url}`)
    })

    it("send request without language in url",()=>{
        service.requestWithoutLangInUrl("GET",`${service.url}`)
    })

    it("language check for Unsupported languages",()=>{
        service.langCheckForUnSupportedLangs("GET",`${service.url}`)
    })

})