import NewsMainTestService from "../../IntegrationServices/news/main.service"

describe("News Update API tests",()=>{
    const service = new NewsMainTestService()
    let url!:string

    before(()=>{
        service.beforeAll()
        .then(()=>{
            return cy.newsCreate(service.token)
        })
        .then(newsId=>{
            service.id = newsId
            url = `${service.url}/${newsId}/${service.supportedLangs[0]}`
        })
    })

    after(()=>{
        service.afterAll()
    })


    it("send request without token",()=>{
        service.testRequestWithNoToken(
            "PATCH",
            url
        )
    })

    it("check news create api working or not",()=>{
        service.testUpdateSuccess(
            url,
            service.mainData.body,
            service.token
        )
    })

    it("send request with body without title",()=>{
        service.testRequiredAttribute(
            "PATCH",
            url,
            service.token,
            service.mainData.withoutTitle,
            "title"
        )
    })

    it("send request with body without short_desc",()=>{
        service.testRequiredAttribute(
            "PATCH",
            url,
            service.token,
            service.mainData.withoutShortDesc,
            "short_desc"
        )
    })


    it("send request with body without desc",()=>{
        service.testRequiredAttribute(
            "PATCH",
            url,
            service.token,
            service.mainData.withoutDesc,
            "desc"
        )
    })

    it("send request with body without date",()=>{
        service.testRequiredAttribute(
            "PATCH",
            url,
            service.token,
            service.mainData.withoutDate,
            "date"
        )
    })

    it("language check for supported languages",()=>{
        service.langCheckForSupportedLangsInUpdate(`${service.url}/${service.id}`)
    })

    it("send request without language in url",()=>{
        service.langCheckForUnSupportedLangs("PATCH",`${service.url}/${service.id}`)
    })

    it("language check for Unsupported languages",()=>{
        service.langCheckForUnSupportedLangs("PATCH",`${service.url}/${service.id}`)
    })

})