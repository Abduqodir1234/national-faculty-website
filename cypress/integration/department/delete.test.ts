import DeprtmentTestService from "../../IntegrationServices/department/create.service"

describe("Department Delete API tests",()=>{


    const service = new DeprtmentTestService()
    let url :string

    before(()=>{
        service.beforeAll()
            .then(()=>{
                cy.departmentCreate(service.token)
                    .then(departmentId=>{
                        service.id = departmentId;
                        url = `${service.url}/${service.id}/${service.supportedLangs[0]}`
                    })
            })
    })

    after(()=>{
        service.afterAll()
            .then(()=>null)
    })

    it("check delete api working well or not",()=>{
        service.testDeleteSuccess(
            url,
            service.token
        )
    })

    it("send request without token",()=>{
        service.testRequestWithNoToken(
            "DELETE",
            url
        )
    })

    it("send request with unexist id",()=>{
        service.testWithNonExistId(
            "DELETE",
            service.url,
            service.token
        )
    })

    it("language check for supported languages",()=>{
        service.langCheckForSupportedLangsInDelete(`${service.url}/${service.id}`)
    })

    it("send request without language in url",()=>{
        service.requestWithoutLangInUrl("DELETE",`${service.url}/${service.id}`)
    })

    it("language check for Unsupported languages",()=>{
        service.langCheckForUnSupportedLangs("DELETE",`${service.url}/${service.id}`)
    })

})