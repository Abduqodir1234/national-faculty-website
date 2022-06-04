import UserMainTestService from "../../IntegrationServices/user/main.service"

describe("User Get API tests",() => {

    const service = new UserMainTestService()
    let url = `${service.url}/${service.supportedLangs[0]}`

    before(()=>{
        service.beforeAll()
    })

    after(()=>{
        service.afterAll()
    })


    it("Get user with token",()=>{
        service.getUser()
    })

    it("Get user without token",()=>{
        service.testRequestWithNoToken(
            "GET",
            url
        )
    })

    it("language check for supported languages",()=>{
        service.langCheckForSupportedLangsInGetByIdinTokenBasedAPI(`${service.url}`)
    })

    it("send request without language in url",()=>{
        service.requestWithoutLangInUrl("GET",`${service.url}`)
    })

    it("language check for unsupported languages",()=>{
        service.langCheckForUnSupportedLangs("GET",`${service.url}`)
    })

   

})