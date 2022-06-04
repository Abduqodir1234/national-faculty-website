import ResourcesMainTestService from "../../IntegrationServices/resources/main.service"

describe("Resources List API tests",()=>{

    const service = new ResourcesMainTestService()
    let url = `${service.url}/${service.supportedLangs[0]}`

    before(()=>{
       service.beforeAll()
       .then(()=>{
           return cy.resourcesCreate(service.token,service.resourceCategoryId)
       })
       .then(resourceId=>{
           service.id = resourceId
       })
    })


    after(()=>{
        service.afterAll()
    })



    it("check get api",()=>{
        service.testListSuccess(url)
    })

    it("check list search with title",()=>{
        service.testListQuerySearch(`${url}?title=${service.mainData.body.title}`)
    })

    it("check list search with categoryId",()=>{
        service.testListQuerySearch(`${url}?categoryId=${service.resourceCategoryId}`)
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