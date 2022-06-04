import ResourceCategoryMainTestService from "../../IntegrationServices/resourceCategory/main.service"

describe("Resource Category Delete API tests",()=>{

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

    it("check delete api with nonexist id",()=>{
        service.testWithNonExistId("DELETE",`${service.url}`,service.token)
    })
    
    it("check delete api",()=>{
        service.testDeleteSuccess(url,service.token)
    })

    it("language check for supported languages",()=>{
        service.langCheckForSupportedLangsInDelete(`${service.url}/${service.id}`)
    })

    it("send request without language in url",()=>{
        service.requestWithoutLangInUrl("DELETE",`${service.url}/${service.id}`)
    })

    it("language check for unsupported languages",()=>{
        service.langCheckForUnSupportedLangs("DELETE",`${service.url}/${service.id}`)
    })

    it("delete without token",()=>{
        service.testRequestWithNoToken(
            "DELETE",
            url,
        )
    })
})