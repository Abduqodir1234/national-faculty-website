import ContestCreateTestService from "../../IntegrationServices/contest/create.service"


describe("Contest Create API tests",()=>{
    const service =new ContestCreateTestService()
    const url = `${service.url}/${service.supportedLangs[0]}`
    before(()=>{
        service.beforeAll()
            .then(()=>null)
    })

    after(()=>{
        service.afterAll()
            .then(()=>null)
    })

    it("send request without token",()=>{
        service.testRequestWithNoToken(
            "POST",
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
        service.testCreateSuccessWithBlob(
            url,
            data,
            service.token
        )
    })

    it("send request with body without title",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            service.token,
            service.mainData.withoutTitle,
            "title"
        )
    })

    it("send request with body with wrong type of title",()=>{
        service.testRequiredAttributeType(
            "POST",
            url,
            service.token,
            service.mainData.withWrongTitle,
            "title",
            "string"
        )
    })

    it("send request with body with wrong type of desc",()=>{
        service.testRequiredAttributeType(
            "POST",
            url,
            service.token,
            service.mainData.withWrongDesc,
            "desc",
            "string"
        )
    })

    it("send request with body with future date",()=>{
        service.testRequiredAttributeInCustomValidation(
            "POST",
            url,
            service.token,
            service.mainData.withWrongDate,
            "\"date\" must be less than or equal to \"now\"",
        )
    })

    it("send request with body without image",()=>{
        service.testRequiredAttributeInCustomValidation(
            "POST",
            url,
            service.token,
            service.mainData.body,
            "Image is required"
        )
    })

    it("send request with body without desc",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            service.token,
            service.mainData.withoutDesc,
            "desc"
        )
    })


    it("send request with body without date",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            service.token,
            service.mainData.withoutDate,
            "date"
        )
    })


    it("language check for supported languages",()=>{
        service.langCheckForSupportedLangsInCreate(service.url)
    })

    it("send request without language in url",()=>{
        service.requestWithoutLangInUrl("POST",service.url)
    })

    it("language check for supported languages",()=>{
        service.langCheckForUnSupportedLangs("POST",service.url)
    })


   


})