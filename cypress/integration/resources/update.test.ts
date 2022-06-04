import ResourcesMainTestService from "../../IntegrationServices/resources/main.service"

describe("Resources Update API tests",()=>{
    const service = new ResourcesMainTestService()
    let url!:string
    before(()=>{
       service.beforeAll()
       .then(()=>{
           return cy.resourcesCreate(service.token,service.resourceCategoryId)
       })
       .then(resourceId=>{
           service.id = resourceId
           url = `${service.url}/${resourceId}/${service.supportedLangs[0]}`
       })
    })


    after(()=>{
        service.afterAll()
    })



   
    it("create api working correctly or not",()=>{
        service.mainData.body.categoryId = service.resourceCategoryId
        service.testUpdateSuccess(
            url,
            service.mainData.body,
            service.token
        )
    })

    it("update item whose id is unexist",()=>{
        service.testWithNonExistId(
            "PATCH",
            service.url,
            service.token,
            service.mainData.body
        )
    })

    
    it("send request with empty body",()=>{
        service.testRequiredAttribute(
            "PATCH",
            url,
            service.token,
            {},
            "title"
        )
    })

    it("send request with body without title ",()=>{
        service.testRequiredAttribute(
            "PATCH",
            url,
            service.token,
            service.mainData.withoutTitle,
            "title"
        )
        
    })

    it("send request with body without desc ",()=>{
        service.testRequiredAttribute(
            "PATCH",
            url,
            service.token,
            service.mainData.withoutDesc,
            "desc"
        )
    })

    it("send request with body without desc ",()=>{
        service.testRequiredAttribute(
            "PATCH",
            url,
            service.token,
            service.mainData.withoutCategoryId,
            "categoryId"
        )
    })

    it("send request with wrong type of title",()=>{
        service.testRequiredAttributeType(
            "PATCH",
            url,
            service.token,
            service.mainData.withWrongTypeTitle,
            "title",
            "string"
        )
    })

    it("send request with wrong type of desc",()=>{
        service.testRequiredAttributeType(
            "PATCH",
            url,
            service.token,
            service.mainData.withWrongTypeDesc,
            "desc",
            "string"
        )
    })

    it("send request with wrong type of categoryId",()=>{
        service.testRequiredAttributeType(
            "PATCH",
            url,
            service.token,
            service.mainData.withWrongTypeCategoryId,
            "categoryId",
            "string"
        )
    })

    it("send request without token",()=>{
        service.testRequestWithNoToken(
            "PATCH",
            url
        )
    })


    it("language check for supported languages",()=>{
        service.langCheckForSupportedLangsInUpdate(`${service.url}/${service.id}`)
    })

    it("send request without language in url",()=>{
        service.langCheckForUnSupportedLangs("PATCH",`${service.url}/${service.id}`)
    })

    it("language check for supported languages",()=>{
        service.langCheckForUnSupportedLangs("PATCH",`${service.url}/${service.id}`)
    })

})