import DepartmentMajorsMainTestService from "../../IntegrationServices/departmentMajors/main.service"

describe("Department Majors Get API tests",()=>{
    const service = new DepartmentMajorsMainTestService()
    const url = `${service.url}/${service.supportedLangs[0]}`
    
    before(()=>{
        service.beforeAll()
            .then(()=>{
                cy.departmentMajorsCreate(service.token,service.departmentId,service.majorId)
                .then(departmentMajorId=>{
                    service.id = departmentMajorId
                    
                })
            })
        
    })

    after(()=>{
        service.afterAll()
            .then(()=>null)
    })

    it("check get api",()=>{
        service.testListSuccess(`${url}`)
    })

    it("check get api with majorId",()=>{
        service.testListQuerySearch(`${url}?majorId=${service.majorId}`)
    })

    it("check get api with departmentId",()=>{
        service.testListQuerySearch(`${url}?departmentId=${service.departmentId}`)
    })

    it("check get api with code",()=>{
        service.testListQuerySearch(`${url}?code=${service.mainData.body.code}`)
    })


    it("language check for supported languages",()=>{
        service.langCheckForSupportedLangsInList(`${service.url}`)
    })

    it("send request without language in url",()=>{
        service.requestWithoutLangInUrlInSomeExceptions("GET",`${service.url}`)
    })

    it("language check for unsupported languages",()=>{
        service.langCheckForUnSupportedLangs("GET",`${service.url}`)
    })

})