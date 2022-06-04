import DepartmentMajorsMainTestService from "../../IntegrationServices/departmentMajors/main.service"

describe("Department Majors Update API tests",()=>{
    const service = new DepartmentMajorsMainTestService()
    let url:string
    before(()=>{
        service.beforeAll()
            .then(()=>{
                cy.departmentMajorsCreate(service.token,service.departmentId,service.majorId)
                .then(departmentMajorId=>{
                    service.id = departmentMajorId
                    url = `${service.url}/${service.id}/${service.supportedLangs[0]}`
                })
            })
        
    })

    after(()=>{
        service.afterAll()
            .then(()=>null)
    })

    it("check update api working successfully",()=>{
        service.mainData.body.departmentId = service.departmentId
        service.mainData.body.majorId = service.majorId

        service.testUpdateSuccess(
            url,
            service.mainData.body,
            service.token
        )
    })

    it("update without token",()=>{
        service.testRequestWithNoToken(
            "PATCH",
            `${service.url}/${service.id}/${service.supportedLangs[0]}`
        )
    })

    it("send request without majorId",()=>{
        service.testRequiredAttribute(
            "PATCH",
            url,
            service.token,
            service.mainData.withoutMajorId,
            "majorId"
        )
    })

    it("send request without departmentId",()=>{
        service.testRequiredAttribute(
            "PATCH",
            url,
            service.token,
            service.mainData.withoutDepartmentId,
            "departmentId"
        )
    })

    it("send request without code",()=>{
        service.testRequiredAttribute(
            "PATCH",
            url,
            service.token,
            service.mainData.withoutCode,
            "code"
        )
    })

    it("send request without degree",()=>{
        service.testRequiredAttribute(
            "PATCH",
            url,
            service.token,
            service.mainData.withoutDegree,
            "degree"
        )
    })


    it("send request with body that includes wrong type of majorId",()=>{
        service.testRequiredAttributeType(
            "PATCH",
            url,
            service.token,
            service.mainData.withWrongTypeOfMajorId,
            "majorId",
            "string"
        )
    })

    it("send request with body that includes wrong type of departmentId",()=>{
        service.testRequiredAttributeType(
            "PATCH",
            url,
            service.token,
            service.mainData.withWrongTypeOfDepartmentId,
            "departmentId",
            "string"
        )
    })

    it("send request with body that includes wrong type of code",()=>{
        service.testRequiredAttributeType(
            "PATCH",
            url,
            service.token,
            service.mainData.withWrongTypeOfCode,
            "code",
            "string"
        )
    })

    it("send request with body that includes wrong type of degree",()=>{
        service.testRequiredAttributeInCustomValidation(
            "PATCH",
            url,
            service.token,
            service.mainData.withWrongTypeOfDegree,
            "\"degree\" must be one of [bachelor, master, doctoral]",
        )
    })

    it("send request with nonexist id",()=>{
        service.testWithNonExistId("PATCH",service.url,service.token,service.mainData.body)
    })

    it("language check for supported languages",()=>{
        service.langCheckForSupportedLangsInUpdate(`${service.url}/${service.id}`)
    })

    it("send request without language in url",()=>{
        service.requestWithoutLangInUrlInSomeExceptions("GET",`${service.url}/${service.id}`)
    })

    it("language check for unsupported languages",()=>{
        service.langCheckForUnSupportedLangs("GET",`${service.url}/${service.id}`)
    })
})