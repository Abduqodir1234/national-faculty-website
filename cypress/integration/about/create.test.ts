import AboutMainTestService from "../../IntegrationServices/about/main.service"


describe("About Create API tests",()=>{
    const service = new AboutMainTestService()

    before(()=>{
        service.beforeAll()
    })

    it("language check for supported languages",()=>{
        service.langCheckForSupportedLangsInCreate(service.url)
    })

    it("send request without language in url",()=>{
        service.requestWithoutLangInUrl("POST",service.url)
    })

    it("language check for supported languages",()=>{
        service.langCheckForUnSupportedLangs("POST",service.url)
    })

    it("create without token",()=>{
        service.testRequestWithNoToken(
            "POST",
            `${service.url}/${service.supportedLangs[0]}`
        )
    })

    it("request with empty body",()=>{
        service.testRequiredAttribute(
            "POST",
            `${service.url}/${service.supportedLangs[0]}`,
            service.token,
            {},
            "desc"
        )
    })
    

    it("create only one data",()=>{
        service.testingAccordingCustomValidation(
            "POST",
            `${service.url}/${service.supportedLangs[0]}`,
            service.token,
            service.mainData.body,
            "Data exists"
        )
    })

})