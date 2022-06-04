import TalentedStudentsMainTestService from "../../IntegrationServices/talentedStudents/main.service"

describe("Department Subjects List API tests",()=>{
    const service = new TalentedStudentsMainTestService()

    before(()=>{
        service.beforeAll()
            .then(()=>{
                cy.talentedStudentsCreate(service.token,service.majorId,service.photo)
                .then(talentedStudentsId=>{
                    service.id = talentedStudentsId
                    
                })
            })
        
    })

    after(()=>{
        service.afterAll()
            .then(()=>null)
    })

    it("check get api",()=>{
        service.testListSuccess(`${service.url}/${service.supportedLangs[0]}`)
    })

    it("check list api with majorId",()=>{
        service.testListQuerySearch(`${service.url}/${service.supportedLangs[0]}?majorId=${service.majorId}`)
    })

    it("check list api with fullname",()=>{
        service.testListQuerySearch(`${service.url}/${service.supportedLangs[0]}?fullname=${service.mainData.body.fullname}`)
    })

    it("check list api with title",()=>{
        service.testListSuccess(`${service.url}/${service.supportedLangs[0]}?title=${service.mainData.body.title}`)
    })

    it("check list api with specialization",()=>{
        service.testListSuccess(`${service.url}/${service.supportedLangs[0]}?specialization=${service.mainData.body.specialization}`)
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