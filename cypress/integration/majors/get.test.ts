import MajorsMainTestService from "../../IntegrationServices/majors/main.service"

describe("Majors Get API tests",()=>{
    const service = new MajorsMainTestService()
    let url!:string

    before(()=>{
        service.beforeAll()
        .then(()=>{
            return cy.majorCreate(service.token)
        })
        .then(res=>{
            service.id = res
            url = `${service.url}/${res}/${service.supportedLangs[0]}`
        })
    })

    after(()=>{
       service.afterAll()
    })

    it("check get api with nonexist id",()=>{
        service.testWithNonExistId("GET",`${service.url}`)
    })
    
    it("check get api",()=>{
        service.testGetByIdSuccess(url)
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