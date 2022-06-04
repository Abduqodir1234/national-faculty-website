import ContestMainTestService from "../../IntegrationServices/contest/main.service"


describe("Contest update API tests",()=>{
    const service = new ContestMainTestService()
    let url:string
    before(()=>{
        service.beforeAll()
            .then(()=>{
                cy.contestCreate(service.token)
                    .then(contestId=>{
                        service.id = contestId
                        url=`${service.url}/${contestId}/${service.supportedLangs[0]}`

                    })
            })
        
    })

    after(()=>{
        service.afterAll()
            .then(()=>null)
    })

    it("send request without token",()=>{
        service.testRequestWithNoToken(
            "PATCH",
            url
        )
    })

    it("check news create api working or not",()=>{
        const {date,desc,title} = service.mainData.body
        let data = new FormData()
        data.append("title",title)
        data.append("desc",desc)
        data.append("date",date)
        data.append("img",service.img)
        service.testUpdateSuccessWithBlob(
            url,
            data,
            service.token
        )
    })

    it("send request with body without title",()=>{
        service.testRequiredAttribute(
            "PATCH",
            url,
            service.token,
            service.mainData.withoutTitle,
            "title"
        )
    })

    it("send request with body with wrong type of title",()=>{
        service.testRequiredAttributeType(
            "PATCH",
            url,
            service.token,
            service.mainData.withWrongTitle,
            "title",
            "string"
        )
    })

    it("send request with body with wrong type of desc",()=>{
        service.testRequiredAttributeType(
            "PATCH",
            url,
            service.token,
            service.mainData.withWrongDesc,
            "desc",
            "string"
        )
    })

    it("send request with body with future date",()=>{
        service.testRequiredAttributeInCustomValidation(
            "PATCH",
            url,
            service.token,
            service.mainData.withWrongDate,
            "\"date\" must be less than or equal to \"now\"",
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


    it("send request with body without date",()=>{
        service.testRequiredAttribute(
            "PATCH",
            url,
            service.token,
            service.mainData.withoutDate,
            "date"
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