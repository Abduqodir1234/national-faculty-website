import TeachersMainTestService from "../../IntegrationServices/teachers/main.service"

describe('Teacher Get API tests',()=>{

    const service = new TeachersMainTestService()
    let url!:string
    before(()=>{
       service.beforeAll()
       .then(()=>{
           return cy.teacherCreate2(service.token,service.departmentId)
       })
       .then(teacherId=>{
           service.id = teacherId
           url = `${service.url}/${teacherId}/${service.supportedLangs[0]}`
       })
    })


    after(()=>{
        service.afterAll()
    })

    it("check get api with nonexist id",()=>{
        service.testWithNonExistId("GET",`${service.url}`)
    })
    
    it("check get api",()=>{
        service.testGetByIdSuccess(url)
    })

    it("language check for supported languages",()=>{
        service.langCheckForSupportedLangsInGetById(`${service.url}/${service.id}`)
    })

    it("send request without language in url",()=>{
        service.requestWithoutLangInUrlInSomeExceptions("GET",`${service.url}/${service.id}`)
    })

    it("language check for unsupported languages",()=>{
        service.langCheckForUnSupportedLangs("GET",`${service.url}/${service.id}`)
    })


})