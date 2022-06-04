import DepartmentSubjectsCreateTestService from "../../IntegrationServices/departmentSubjects/create.service"

describe("Department Subjects Create API tests",()=>{
    const service = new DepartmentSubjectsCreateTestService()
    const supportedLangs:string[] = Cypress.env("supportedLangs")

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
            `${service.url}/${supportedLangs[0]}`
        )
    })

    it("check create api working successfully",()=>{
        service.mainData.body.departmentId = service.departmentId
        service.mainData.body.subjectId = service.subjectId

        service.testCreateSuccess(
            `${service.url}/${supportedLangs[0]}`,
            service.mainData.body,
            service.token
        )
    })

    it("send request without subjectId",()=>{
        service.testRequiredAttribute(
            "POST",
            `${service.url}/uz`,
            service.token,
            service.mainData.withoutSubjectId,
            "subjectId"
        )
    })

    it("send request without departmentId",()=>{
        service.testRequiredAttribute(
            "POST",
            `${service.url}/uz`,
            service.token,
            service.mainData.withoutDepartmentId,
            "departmentId"
        )
    })


    it("send request without degree",()=>{
        service.testRequiredAttribute(
            "POST",
            `${service.url}/uz`,
            service.token,
            service.mainData.withoutDegree,
            "degree"
        )
    })


    it("send request with body that includes wrong type of subjectId",()=>{
        service.testRequiredAttributeType(
            "POST",
            `${service.url}/uz`,
            service.token,
            service.mainData.withWrongTypeOfSubjectId,
            "subjectId",
            "string"
        )
    })

    it("send request with body that includes wrong type of departmentId",()=>{
        service.testRequiredAttributeType(
            "POST",
            `${service.url}/uz`,
            service.token,
            service.mainData.withWrongTypeOfDepartmentId,
            "departmentId",
            "string"
        )
    })



    it("send request with body that includes wrong type of degree",()=>{
        service.testRequiredAttributeInCustomValidation(
            "POST",
            `${service.url}/uz`,
            service.token,
            service.mainData.withWrongTypeOfDegree,
            "\"degree\" must be one of [bachelor, master, doctoral]",
        )
    })


})