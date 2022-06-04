import MainInfosMainTestService from "../../IntegrationServices/mainInfos/main.service"


describe("Main Infos Create API tests",()=>{
    const service = new MainInfosMainTestService()
    const url = `${service.url}/${service.supportedLangs[0]}`

    before(()=>{
        service.beforeAll()
    })

    after(()=>{
        service.afterAll()
    })


    it("request without token",()=>{
        service.testRequestWithNoToken(
            "POST",
            url
        )
    })

    it("request with empty body",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            service.token,
            {},
            "email"
        )
    })
    

    it("create only one data",()=>{
        service.testingAccordingCustomValidation(
            "POST",
            url,
            service.token,
            service.mainData.body,
            "Data exists"
        )
    })

    it("send request with body without email",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            service.token,
            service.mainData.withoutEmail,
            "email"
        )
    })

    it("send request with body without phoneNumber",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            service.token,
            service.mainData.withoutPhoneNumber,
            "phoneNumber"
        )
    })


    it("send request with body without address",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            service.token,
            service.mainData.withoutAddress,
            "address"
        )
    })

    it("send request with body without coordinate x",()=>{
        service.testingAccordingCustomValidation(
            "POST",
            url,
            service.token,
            service.mainData.withoutCoordinateX,
            "Data exists"
        )
    })


    it("send request with body without coordinate Y",()=>{
        service.testingAccordingCustomValidation(
            "POST",
            url,
            service.token,
            service.mainData.withoutCoordinateY,
            "Data exists"
        )
    })

    it("send request with body without facebook",()=>{
        service.testingAccordingCustomValidation(
            "POST",
            url,
            service.token,
            service.mainData.withoutFacebook,
            "Data exists"
        )
    })


    it("send request with body without instagram",()=>{
        service.testingAccordingCustomValidation(
            "POST",
            url,
            service.token,
            service.mainData.withoutInstagram,
            "Data exists"
        )
    })

    it("send request with body without telegram",()=>{
        service.testingAccordingCustomValidation(
            "POST",
            url,
            service.token,
            service.mainData.withoutTelegram,
            "Data exists"
        )
    })


    it("send request with body without youtube",()=>{
        service.testingAccordingCustomValidation(
            "POST",
            url,
            service.token,
            service.mainData.withoutYoutube,
            "Data exists"
        )
    })


    it("send request with body without startWork",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            service.token,
            service.mainData.withoutStartWork,
            "startWork"
        )
    })


    it("send request with body without endWork",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            service.token,
            service.mainData.withoutEndWork,
            "endWork"
        )
    })

    it("language check for supported languages",()=>{
        service.langCheckForSupportedLangsInCreate(service.url)
    })

    it("send request without language in url",()=>{
        service.langCheckForUnSupportedLangs("POST",service.url)
    })

    it("language check for supported languages",()=>{
        service.langCheckForUnSupportedLangs("POST",service.url)
    })



})