import DeprtmentTestService from "../../IntegrationServices/department/create.service"

describe('Department Get API tests',()=>{

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

    it("get api working well or not",()=>{
        service.testGetByIdSuccess(url)
    })

    it("send request with nonexist id",()=>{
        service.testWithNonExistId("GET",service.url,service.token)
    })

    it("language check for supported languages",()=>{
        service.langCheckForSupportedLangsInGetById(`${service.url}/${service.id}`)
    })

    it("send request without language in url",()=>{
        service.requestWithoutLangInUrlInSomeExceptions("GET",`${service.url}/${service.id}`)
    })

    it("language check for Unsupported languages",()=>{
        service.langCheckForUnSupportedLangs("GET",`${service.url}/${service.id}`)
    })

})