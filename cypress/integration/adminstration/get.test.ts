
import AdminstrationMainTestService from "../../IntegrationServices/adminstration/main.service"


describe("Adminstration Get API tests",()=>{

    const service = new AdminstrationMainTestService()
    let url:string
    before(()=>{
        service.beforeAll()
            .then(()=>{
                cy.adminstrationCreate(service.token,service.departmentId,service.teacherId)
                    .then(res=>{
                        service.id = res
                        url=`${service.url}/${service.id}/${service.supportedLangs[0]}`
                    })
            })
    })

    after(()=>{
        service.afterAll()
            .then(()=>null)
    })


    it("get api working well or not",()=>{
        service.testGetByIdSuccess(url)
    })

    it("send request with nonexist id",()=>{
        service.testWithNonExistId("GET",service.url,service.token)
    })

    it("language check for supported languages",()=>{
        service.langCheckForSupportedLangsInGetById(`${service.url}/${service.id}`)
    })

    it("send request without language in url",()=>{
        service.requestWithoutLangInUrlInSomeExceptions("GET",`${service.url}/${service.id}`)
    })

    it("language check for Unsupported languages",()=>{
        service.langCheckForUnSupportedLangs("GET",`${service.url}/${service.id}`)
    })

})