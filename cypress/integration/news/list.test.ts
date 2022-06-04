import NewsMainTestService from "../../IntegrationServices/news/main.service"
import "../../support/commands"
import { NewsDataProps } from "../../types/news"

describe("News Get API tests",()=>{

    const service = new NewsMainTestService()
    let url = `${service.url}/${service.supportedLangs[0]}`

    before(()=>{
        service.beforeAll()
        .then(()=>{
            return cy.newsCreate(service.token)
        })
    })

    after(()=>{
        service.afterAll()
    })

    it("check get api",()=>{
        service.testListSuccess(url)
    })

    it("check list search with name",()=>{
        service.testListQuerySearch(`${url}?title=${service.mainData.body.title}`)
    })

    it("check list search with short_desc",()=>{
        service.testListQuerySearch(`${url}?short_desc=${service.mainData.body.short_desc}`)
    })

    it("language check for supported languages",()=>{
        service.langCheckForSupportedLangsInList(`${service.url}`)
    })

    it("send request without language in url",()=>{
        service.requestWithoutLangInUrl("GET",`${service.url}`)
    })

    it("language check for unsupported languages",()=>{
        service.langCheckForUnSupportedLangs("GET",`${service.url}`)
    })


})