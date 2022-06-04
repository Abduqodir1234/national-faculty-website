import DepartmentSubjectMainTestService from "../../IntegrationServices/departmentSubjects/main.service"

describe("Department Subject Delete API tests",()=>{
    const service = new DepartmentSubjectMainTestService()
    let url!:string

    before(()=>{
        service.beforeAll()
            .then(()=>{
                cy.departmentSubjectCreate(service.token,service.departmentId,service.subjectId)
                .then(departmentSubjectId=>{
                    service.id = departmentSubjectId
                    url = `${service.url}/${departmentSubjectId}/${service.supportedLangs[0]}`
                })
            })
        
    })

    after(()=>{
        service.afterAll()
            .then(()=>null)
    })

    it("check delete api with nonexist id",()=>{
        service.testWithNonExistId("DELETE",`${service.url}`,service.token)
    })
    
    it("check delete api",()=>{
        service.testDeleteSuccess(url,service.token)
    })

    it("language check for supported languages",()=>{
        service.langCheckForSupportedLangsInDelete(`${service.url}/${service.id}`)
    })

    it("send request without language in url",()=>{
        service.requestWithoutLangInUrlInSomeExceptions("DELETE",`${service.url}/${service.id}`)
    })

    it("language check for unsupported languages",()=>{
        service.langCheckForUnSupportedLangs("DELETE",`${service.url}/${service.id}`)
    })

    it("delete without token",()=>{
        service.testRequestWithNoToken(
            "DELETE",
            url,
        )
    })
    
})