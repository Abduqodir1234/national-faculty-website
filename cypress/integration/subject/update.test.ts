import SubjectMainTestService from "../../IntegrationServices/subject/main.service"

describe("Subject update API tests",()=>{

    const service = new SubjectMainTestService()
    let url!:string

    before(()=>{
        service.beforeAll()
        .then(()=>{
            return cy.subjectCreate(service.token)
        })
        .then(res=>{
            service.id = res
            url = `${service.url}/${res}/${service.supportedLangs[0]}`
        })
    })

    after(()=>{
       service.afterAll()
    })


    it("create api working correctly or not",()=>{
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