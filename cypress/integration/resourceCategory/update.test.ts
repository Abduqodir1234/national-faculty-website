import ResourceCategoryMainTestService from "../../IntegrationServices/resourceCategory/main.service"
describe("Resource Category Update API tests",()=>{
    const service = new ResourceCategoryMainTestService()
    let url!:string

    before(()=>{
        service.beforeAll()
        .then(()=>{
            return cy.resourceCategoryCreate(service.token)
        })
        .then(resourceCategoryId=>{
            service.id = resourceCategoryId
            url = `${service.url}/${resourceCategoryId}/${service.supportedLangs[0]}`
        })
    })

    after(()=>{
        service.afterAll()
    })


    it("update api working correctly or not",()=>{
        service.testUpdateSuccess(
            url,
            service.mainData.body,
            service.token
        )
    })


    it("send request with empty body",()=>{
        service.testRequiredAttribute(
            "PATCH",
            url,
            service.token,
            {},
            "name"
        )
    })

    it("send request without token",()=>{
        service.testRequestWithNoToken(
            "PATCH",
            url,
        )
    })

    it("language check for supported languages",()=>{
        service.langCheckForSupportedLangsInUpdate(`${service.url}/${service.id}`)
    })

    it("send request without language in url",()=>{
        service.requestWithoutLangInUrl("PATCH",`${service.url}/${service.id}`)
    })

    it("language check for supported languages",()=>{
        service.langCheckForUnSupportedLangs("PATCH",`${service.url}/${service.id}`)
    })

})