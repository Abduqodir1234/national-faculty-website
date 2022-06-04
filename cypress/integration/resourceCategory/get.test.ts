import ResourceCategoryMainTestService from "../../IntegrationServices/resourceCategory/main.service"

describe("Resource Category Get API tests",()=>{
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