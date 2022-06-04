import ContestMainTestService from "../../IntegrationServices/contest/main.service"
import "../../support/commands"
import { ContestDataProps } from "../../types/contest"
import { NewsDataProps } from "../../types/news"

describe("Contest List API tests",()=>{

    const service = new ContestMainTestService()
    let url= `${service.url}/${service.supportedLangs[0]}`

    before(()=>{
        service.beforeAll()
            .then(()=>{
                cy.contestCreate(service.token)
                    .then(contestId=>{
                        service.id = contestId
                    })
            })
        
    })

    after(()=>{
        service.afterAll()
            .then(()=>null)
    })

    it("search with title",()=>{
        service.testListSuccess(`${url}?title=${service.mainData.body.title}`)
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