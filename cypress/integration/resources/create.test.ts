import ResourcesMainTestService from "../../IntegrationServices/resources/main.service"

describe("Resources Create API tests",()=>{
    const service = new ResourcesMainTestService()
    let url = `${service.url}/${service.supportedLangs[0]}`
    before(()=>{
       service.beforeAll()
    })


    after(()=>{
        service.afterAll()
    })


    it("create api working correctly or not",()=>{
        service.mainData.body.categoryId = service.resourceCategoryId
        service.testCreateSuccess(
            url,
            service.mainData.body,
            service.token
        )
    })

    
    it("send request with empty body",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            service.token,
            {},
            "title"
        )
    })

    it("send request with body without title ",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            service.token,
            service.mainData.withoutTitle,
            "title"
        )
        
    })

    it("send request with body without desc ",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            service.token,
            service.mainData.withoutDesc,
            "desc"
        )
    })

    it("send request with body without desc ",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            service.token,
            service.mainData.withoutCategoryId,
            "categoryId"
        )
    })

    it("send request with wrong type of title",()=>{
        service.testRequiredAttributeType(
            "POST",
            url,
            service.token,
            service.mainData.withWrongTypeTitle,
            "title",
            "string"
        )
    })

    it("send request with wrong type of desc",()=>{
        service.testRequiredAttributeType(
            "POST",
            url,
            service.token,
            service.mainData.withWrongTypeDesc,
            "desc",
            "string"
        )
    })

    it("send request with wrong type of categoryId",()=>{
        service.testRequiredAttributeType(
            "POST",
            url,
            service.token,
            service.mainData.withWrongTypeCategoryId,
            "categoryId",
            "string"
        )
    })

    it("send request without token",()=>{
        service.testRequestWithNoToken(
            "POST",
            url
        )
    })


    it("language check for supported languages",()=>{
        service.langCheckForSupportedLangsInCreate(service.url)
    })

    it("send request without language in url",()=>{
        service.langCheckForUnSupportedLangs("POST",service.url)
    })

    it("language check for supported languages",()=>{
        service.langCheckForUnSupportedLangs("POST",service.url)
    })



})