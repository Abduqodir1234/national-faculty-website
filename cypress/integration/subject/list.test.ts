import SubjectMainTestService from "../../IntegrationServices/subject/main.service"


describe("Subject list API tests",()=>{

    const service = new SubjectMainTestService()
    let url = `${service.url}/${service.supportedLangs[0]}`

    before(()=>{
        service.beforeAll()
        .then(()=>{
            return cy.subjectCreate(service.token)
        })
        .then(res=>{
            service.id = res
        })
    })

    after(()=>{
       service.afterAll()
    })

    it("check get api",()=>{
        service.testListSuccess(url)
    })

    it("check get api with name",()=>{
        service.testListQuerySearch(`${url}?name=${service.mainData.body.name}`)
    })



    it("language check for supported languages",()=>{
        service.langCheckForSupportedLangsInList(`${service.url}`)
    })

    it("send request without language in url",()=>{
        service.requestWithoutLangInUrl("GET",`${service.url}`)
    })

    it("language check for unsupported languages",()=>{
        service.langCheckForUnSupportedLangs("GET",`${service.url}`)
    })



})