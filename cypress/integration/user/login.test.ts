import UserLoginMainTestService from "../../IntegrationServices/user/login.service"

describe("User Login API tests",()=>{
    const service = new UserLoginMainTestService()
    let url = `${service.url}/${service.supportedLangs[0]}`

    before(()=>{
        service.beforeAll()
    })

    after(()=>{
        service.afterAll()
    })


    it("check login working correctly",()=>{
        cy.signIn()
    })

    it("send data to api without email",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            "",
            service.mainData.withoutEmail,
            "email"
        )
    })

    

    it("send data to api without password",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            "",
            service.mainData.withoutPassword,
            "password"
        )
    })

    it("send data to api without body",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            "",
            {},
            "email"
        )
    })


    it("send data to api with wrong email",()=>{
        service.testingAccordingCustomValidation(
            "POST",
            url,
            "",
            service.mainData.wrongEmail,
            "\"email\" must be a valid email"
        )
    })

    it("send data to api with wrong password",()=>{
        service.testRequiredAttributeType(
            "POST",
            url,
            "",
            service.mainData.wrongPassword,
            "password",
            "string"
        )
    })

    it("language check for supported languages",()=>{
        service.langCheckForSupportedLangsInLogin()
    })

    it("send request without language in url",()=>{
        service.requestWithoutLangInUrl("POST",`${service.url}`)
    })

    it("language check for unsupported languages",()=>{
        service.langCheckForUnSupportedLangs("POST",`${service.url}`)
    })



})