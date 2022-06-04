import "../../support/commands"
import AboutMainTestService from "../../IntegrationServices/about/main.service"

describe("About Update API tests",()=>{
    let oldData:string
    const service = new AboutMainTestService()

    before(()=>{
       service.beforeAll()
       .then(()=>{
            cy.getRequest("/about/uz")
                .then(res=>{
                    oldData = res.body.data.desc
                })
        })    
    })

    after(()=>{
        service.testUpdateSuccess(
            `${service.url}/${service.supportedLangs[0]}`,
            {desc:oldData},
            service.token
        )
    })


    it("update with empty body",()=>{
        service.testRequiredAttribute(
            "PATCH",
            `${service.url}/${service.supportedLangs[0]}`,
            service.token,
            {},
            "desc"
        )
    })


    it("update working correctly or not",()=>{
        service.testUpdateSuccess(
            `${service.url}/${service.supportedLangs[0]}`,
            service.mainData.body,
            service.token
        )
    })

    it("update without token",()=>{
        service.testRequestWithNoToken(
            "PATCH",
            `${service.url}/${service.supportedLangs[0]}`
        )
    })

    it("language check for supported languages",()=>{
        service.langCheckForSupportedLangsInCreate(service.url)
    })

    it("send request without language in url",()=>{
        service.requestWithoutLangInUrl("PATCH",service.url)
    })

    it("language check for supported languages",()=>{
        service.langCheckForUnSupportedLangs("PATCH",service.url)
    })

})