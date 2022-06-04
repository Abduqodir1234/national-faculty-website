import NewsMainTestService from "../../IntegrationServices/news/main.service"

describe("News list API tests",() => {
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