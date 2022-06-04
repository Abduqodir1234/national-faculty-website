import AdminstrationMainTestService from "../../IntegrationServices/adminstration/main.service";

describe("Adminstration Update API tests",()=>{
    const service = new AdminstrationMainTestService()
    let url:string
    before(()=>{
        service.beforeAll()
            .then(()=>{
                cy.adminstrationCreate(service.token,service.departmentId,service.teacherId)
                    .then(res=>{
                        service.id = res
                        url=`${service.url}/${service.id}/${service.supportedLangs[0]}`
                    })
            })
    })

    after(()=>{
        service.afterAll()
            .then(()=>null)
    })


    it("Update API working correctly or not",()=>{
        service. mainData.body.teacherId = service.teacherId
        service. mainData.body.departmentId = service.departmentId

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
            "teacherId"
        )
    })

    it("send request with body without teacherId",()=>{
        service.testRequiredAttribute(
            "PATCH",
            url,
            service.token,
            service.mainData.withoutTeacherId,
            "teacherId"
        )
    })

    it("send request with body without departmentId",()=>{
        service.testRequiredAttribute(
            "PATCH",
            url,
            service.token,
            service.mainData.withoutDepartmentId,
            "departmentId"
        )
    })

    it("send request with body without reception_time_starts",()=>{
        service.testRequiredAttribute(
            "PATCH",
            url,
            service.token,
            service.mainData.withoutReceptionTimeStart,
            "reception_time_starts"
        )
    })

    it("send request with body without reception_time_ends",()=>{
        service.testRequiredAttribute(
            "PATCH",
            url,
            service.token,
            service.mainData.withoutReceptionTimeEnd,
            "reception_time_ends"
        )
    })

    it("send request with wrong type of reception_time_ends",()=>{
        service.testRequiredAttributeType(
            "PATCH",
            url,
            service.token,
            service.mainData.withWrongTypeReceptionTimeEnd,
            "reception_time_ends",
            "string"
        )
    })

    it("send request with wrong type of reception_time_starts",()=>{
        service.testRequiredAttributeType(
            "PATCH",
            url,
            service.token,
            service.mainData.withWrongTypeReceptionTimeStart,
            "reception_time_starts",
            "string"
        )
    })


    it("send request with wrong type of teacherId",()=>{
        service.testRequiredAttributeType(
            "PATCH",
            url,
            service.token,
            service.mainData.withWrongTypeTeacherId,
            "teacherId",
            "string"
        )
    })

    it("send request with wrong type of departmentId",()=>{
        service.testRequiredAttributeType(
            "PATCH",
            url,
            service.token,
            service.mainData.withWrongTypeDepartmentId,
            "departmentId",
            "string"
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