import DepartmentMajorsCreateTestService from "../../IntegrationServices/departmentMajors/create.service"

describe("DepartmentMajors Create API tests",()=>{
    const service = new DepartmentMajorsCreateTestService()
    const supportedLangs:string[] = Cypress.env("supportedLangs")
    const url = `${service.url}/${supportedLangs[0]}`
    before(()=>{
        service.beforeAll()     
    })

    after(()=>service.afterAll())

    it("language check for supported languages",()=>{
        service.langCheckForSupportedLangsInCreate(service.url)
    })

    it("send request without language in url",()=>{
        service.requestWithoutLangInUrlInSomeExceptions("POST",service.url)
    })

    it("language check for supported languages",()=>{
        service.langCheckForUnSupportedLangs("POST",service.url)
    })

    it("create without token",()=>{
        service.testRequestWithNoToken(
            "POST",
            url
        )
    })

    it("check create api working successfully",()=>{
        service.mainData.body.departmentId = service.departmentId
        service.mainData.body.majorId = service.majorId

        service.testCreateSuccess(
            url,
            service.mainData.body,
            service.token
        )
    })

    it("send request without majorId",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            service.token,
            service.mainData.withoutMajorId,
            "majorId"
        )
    })

    it("send request without departmentId",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            service.token,
            service.mainData.withoutDepartmentId,
            "departmentId"
        )
    })

    it("send request without code",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            service.token,
            service.mainData.withoutCode,
            "code"
        )
    })

    it("send request without degree",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            service.token,
            service.mainData.withoutDegree,
            "degree"
        )
    })


    it("send request with body that includes wrong type of majorId",()=>{
        service.testRequiredAttributeType(
            "POST",
            url,
            service.token,
            service.mainData.withWrongTypeOfMajorId,
            "majorId",
            "string"
        )
    })

    it("send request with body that includes wrong type of departmentId",()=>{
        service.testRequiredAttributeType(
            "POST",
            url,
            service.token,
            service.mainData.withWrongTypeOfDepartmentId,
            "departmentId",
            "string"
        )
    })

    it("send request with body that includes wrong type of code",()=>{
        service.testRequiredAttributeType(
            "POST",
            url,
            service.token,
            service.mainData.withWrongTypeOfCode,
            "code",
            "string"
        )
    })

    it("send request with body that includes wrong type of degree",()=>{
        service.testRequiredAttributeInCustomValidation(
            "POST",
            url,
            service.token,
            service.mainData.withWrongTypeOfDegree,
            "\"degree\" must be one of [bachelor, master, doctoral]",
        )
    })


})