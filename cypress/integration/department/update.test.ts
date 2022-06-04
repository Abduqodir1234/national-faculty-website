import DeprtmentTestService from "../../IntegrationServices/department/create.service"

describe("Department Update API tests",()=>{
    const service = new DeprtmentTestService()
    let url:string 

    before(()=>{
        service.beforeAll()
            .then(()=>{
                cy.departmentCreate(service.token)
                    .then(departmentId=>{
                        service.id = departmentId;
                        url = `${service.url}/${departmentId}/${service.supportedLangs[0]}`
                    })
            })
    })

    after(()=>{
        service.afterAll()
            .then(()=>null)
    })



    it("create api working or not",()=>{
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
            "name"
        )
    })

    it("send request with body without name",()=>{
        service.testRequiredAttribute(
            "PATCH",
            url,
            service.token,
            service.mainData.withoutName,
            "name"
        )
    })

    it("send request with body with wrong type of name",()=>{
        service.testRequiredAttributeType(
            "PATCH",
            url,
            service.token,
            service.mainData.withWrongTypeOfName,
            "name",
            "string"
        )
    })

    it("send request with body without desc",()=>{
        service.testRequiredAttribute(
            "PATCH",
            url,
            service.token,
            service.mainData.withoutDesc,
            "desc"
        )
        
    })

    it("send request with body with wrong type of desc",()=>{
        service.testRequiredAttributeType(
            "PATCH",
            url,
            service.token,
            service.mainData.withWrongTypeOfDesc,
            "desc",
            "string"
        )
    })

    it("send request with body without address",()=>{
        service.testRequiredAttribute(
            "PATCH",
            url,
            service.token,
            service.mainData.withoutAddress,
            "address"
        )
    })

    it("send request with body with wrong type of address",()=>{
        service.testRequiredAttributeType(
            "PATCH",
            url,
            service.token,
            service.mainData.withWrongTypeOfAddress,
            "address",
            "string"
        )
    })

    it("send request with unexist or wrong dean",()=>{
        service.testingAccordingCustomValidation(
            "PATCH",
            url,
            service.token,
            service.mainData.withUnexistTeacherIdForDean,
            "Teacher not found"
        )
    })

    it("send request with nonexist id",()=>{
        service.testWithNonExistId("PATCH",service.url,service.token,service.mainData.body)
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