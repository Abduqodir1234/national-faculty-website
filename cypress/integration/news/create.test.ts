import NewsMainTestService from "../../IntegrationServices/news/main.service"

describe("News Create API tests",()=>{

    const service = new NewsMainTestService()
    let url = `${service.url}/${service.supportedLangs[0]}`

    before(()=>{
        service.beforeAll()
    })

    after(()=>{
        service.afterAll()
    })

    it("send request without token",()=>{
        service.testRequestWithNoToken(
            "POST",
            url
        )
    })

    it("check news create api working or not",()=>{
        service.testCreateSuccess(
            url,
            service.mainData.body,
            service.token
        )
    })

    it("send request with body without title",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            service.token,
            service.mainData.withoutTitle,
            "title"
        )
    })

    it("send request with body without short_desc",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            service.token,
            service.mainData.withoutShortDesc,
            "short_desc"
        )
    })


    it("send request with body without desc",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            service.token,
            service.mainData.withoutDesc,
            "desc"
        )
    })

    it("send request with body without date",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            service.token,
            service.mainData.withoutDate,
            "date"
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