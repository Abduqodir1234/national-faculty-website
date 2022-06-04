import DeprtmentTestService from "../../IntegrationServices/department/create.service"

describe("Department Create API tests",()=>{

    const service = new DeprtmentTestService()
    const url = `${service.url}/${service.supportedLangs[0]}`

    before(()=>{
        service.beforeAll()
            .then(()=>null)
    })

    after(()=>{
        service.afterAll()
            .then(()=>null)
    })


    it("send without token",()=>{
        service.testRequestWithNoToken(
            "POST",
            url
        )
    })

    it("create api working or not",()=>{
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
            "name"
        )
    })

    it("send request with body without name",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            service.token,
            service.mainData.withoutName,
            "name"
        )
    })

    it("send request with body with wrong type of name",()=>{
        service.testRequiredAttributeType(
            "POST",
            url,
            service.token,
            service.mainData.withWrongTypeOfName,
            "name",
            "string"
        )
    })

    it("send request with body without desc",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            service.token,
            service.mainData.withoutDesc,
            "desc"
        )
        
    })

    it("send request with body with wrong type of desc",()=>{
        service.testRequiredAttributeType(
            "POST",
            url,
            service.token,
            service.mainData.withWrongTypeOfDesc,
            "desc",
            "string"
        )
    })

    it("send request with body without address",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            service.token,
            service.mainData.withoutAddress,
            "address"
        )
    })

    it("send request with body with wrong type of address",()=>{
        service.testRequiredAttributeType(
            "POST",
            url,
            service.token,
            service.mainData.withWrongTypeOfAddress,
            "address",
            "string"
        )
    })

    it("send request with unexist or wrong dean",()=>{
        service.testingAccordingCustomValidation(
            "POST",
            url,
            service.token,
            service.mainData.withUnexistTeacherIdForDean,
            "Teacher not found"
        )
    })

    it("language check for supported languages",()=>{
        service.langCheckForSupportedLangsInCreate(service.url)
    })

    it("send request without language in url",()=>{
        service.requestWithoutLangInUrl("POST",service.url)
    })

    it("language check for supported languages",()=>{
        service.langCheckForUnSupportedLangs("POST",service.url)
    })


})