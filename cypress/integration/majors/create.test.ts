import MajorsMainTestService from "../../IntegrationServices/majors/main.service"

describe("Major Create API tests",()=>{
    const service = new MajorsMainTestService()
    let url = `${service.url}/${service.supportedLangs[0]}`

    before(()=>{
        service.beforeAll()
    })

    after(()=>{
       service.afterAll()
    })



    it("create api working correctly or not",()=>{
        service.testCreateSuccess(
            url,
            service.mainData.body,
            service.token
        )
    })


    it("send request with empty body",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            service.token,
            {},
            "name"
        )
    })

    it("send request without token",()=>{
        service.testRequestWithNoToken(
            "POST",
            url,
        )
    })

    it("language check for supported languages",()=>{
        service.langCheckForSupportedLangsInCreate(service.url)
    })

    it("send request without language in url",()=>{
        service.langCheckForUnSupportedLangs("POST",service.url)
    })

    it("language check for supported languages",()=>{
        service.langCheckForUnSupportedLangs("POST",service.url)
    })


})