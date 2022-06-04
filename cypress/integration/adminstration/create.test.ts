import AdminstrationCreateTestService from "../../IntegrationServices/adminstration/create.service"

describe("Adminstration Create API tests",()=>{
    const service = new AdminstrationCreateTestService()
    before(()=>{
        service.beforeAll()
            .then(()=>null)
    })

    after(()=>{
        service.afterAll()
            .then(()=>null)
    })

    it("create api working correctly or not",()=>{
        service. mainData.body.teacherId = service.teacherId
        service. mainData.body.departmentId = service.departmentId

        service.testCreateSuccess(
            `${service.url}/${service.supportedLangs[0]}`,
            service.mainData.body,
            service.token
        )
    })

    
    it("send request with empty body",()=>{
        service.testRequiredAttribute(
            "POST",
            `${service.url}/${service.supportedLangs[0]}`,
            service.token,
            {},
            "teacherId"
        )
    })

    it("send request with body without teacherId",()=>{
        service.testRequiredAttribute(
            "POST",
            `${service.url}/${service.supportedLangs[0]}`,
            service.token,
            service.mainData.withoutTeacherId,
            "teacherId"
        )
    })

    it("send request with body without departmentId",()=>{
        service.testRequiredAttribute(
            "POST",
            `${service.url}/${service.supportedLangs[0]}`,
            service.token,
            service.mainData.withoutDepartmentId,
            "departmentId"
        )
    })

    it("send request with body without reception_time_starts",()=>{
        service.testRequiredAttribute(
            "POST",
            `${service.url}/${service.supportedLangs[0]}`,
            service.token,
            service.mainData.withoutReceptionTimeStart,
            "reception_time_starts"
        )
    })

    it("send request with body without reception_time_ends",()=>{
        service.testRequiredAttribute(
            "POST",
            `${service.url}/${service.supportedLangs[0]}`,
            service.token,
            service.mainData.withoutReceptionTimeEnd,
            "reception_time_ends"
        )
    })

    it("send request with wrong type of reception_time_ends",()=>{
        service.testRequiredAttributeType(
            "POST",
            `${service.url}/${service.supportedLangs[0]}`,
            service.token,
            service.mainData.withWrongTypeReceptionTimeEnd,
            "reception_time_ends",
            "string"
        )
    })

    it("send request with wrong type of reception_time_starts",()=>{
        service.testRequiredAttributeType(
            "POST",
            `${service.url}/${service.supportedLangs[0]}`,
            service.token,
            service.mainData.withWrongTypeReceptionTimeStart,
            "reception_time_starts",
            "string"
        )
    })


    it("send request with wrong type of teacherId",()=>{
        service.testRequiredAttributeType(
            "POST",
            `${service.url}/${service.supportedLangs[0]}`,
            service.token,
            service.mainData.withWrongTypeTeacherId,
            "teacherId",
            "string"
        )
    })

    it("send request with wrong type of departmentId",()=>{
        service.testRequiredAttributeType(
            "POST",
            `${service.url}/${service.supportedLangs[0]}`,
            service.token,
            service.mainData.withWrongTypeDepartmentId,
            "departmentId",
            "string"
        )
    })


    it("send request without token",()=>{
        service.testRequestWithNoToken(
            "POST",
            `${service.url}/${service.supportedLangs[0]}`,
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