import DepartmentSubjectMainTestService from "../../IntegrationServices/departmentSubjects/main.service"

describe("Department Subjects Update API tests",()=>{
    const service = new DepartmentSubjectMainTestService()
    const supportedLangs:string[] = Cypress.env("supportedLangs")
    let url:string

    before(()=>{
        service.beforeAll()
            .then(()=>{
                cy.departmentSubjectCreate(service.token,service.departmentId,service.subjectId)
                .then(departmentSubjectId=>{
                    service.id = departmentSubjectId
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
        service.mainData.body.subjectId = service.subjectId

        service.testUpdateSuccess(
            url,
            service.mainData.body,
            service.token
        )
    })

    it("update without token",()=>{
        service.testRequestWithNoToken(
            "PATCH",
            url,
        )
    })


    

    it("send request without subjectId",()=>{
        service.testRequiredAttribute(
            "PATCH",
            url,
            service.token,
            service.mainData.withoutSubjectId,
            "subjectId"
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


    it("send request without degree",()=>{
        service.testRequiredAttribute(
            "PATCH",
            url,
            service.token,
            service.mainData.withoutDegree,
            "degree"
        )
    })


    it("send request with body that includes wrong type of subjectId",()=>{
        service.testRequiredAttributeType(
            "PATCH",
            url,
            service.token,
            service.mainData.withWrongTypeOfSubjectId,
            "subjectId",
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