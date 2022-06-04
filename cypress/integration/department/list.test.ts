import DeprtmentTestService from "../../IntegrationServices/department/create.service"

describe("Department List API tests",()=>{

    const service = new DeprtmentTestService()
    let url = `${service.url}/${service.supportedLangs[0]}` 

    before(()=>{
        service.beforeAll()
            .then(()=>{
                cy.departmentCreate(service.token)
                    .then(departmentId=>{
                        service.id = departmentId;
                    })
            })
    })

    after(()=>{
        service.afterAll()
            .then(()=>null)
    })


    it("search with name",()=>{
        service.testListSuccess(`${url}?name=${service.mainData.body.name}`)
    })


    it("language check for supported languages",()=>{
        service.langCheckForSupportedLangsInList(`${service.url}`)
    })

    it("send request without language in url",()=>{
        service.requestWithoutLangInUrl("GET",`${service.url}`)
    })

    it("language check for Unsupported languages",()=>{
        service.langCheckForUnSupportedLangs("GET",`${service.url}`)
    })

})