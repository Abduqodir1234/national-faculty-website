import UserMainTestService from "../../IntegrationServices/user/main.service"

describe("User Register API tests",()=>{
    const service = new UserMainTestService()
    let url = `${service.url}/register/${service.supportedLangs[0]}`


    before(()=>{
        service.beforeAll()
    })

    after(()=>{
        service.afterAll()
    })

    
    it("check register working correctly",()=>{
            service.testCreateSuccess(
                url,
                service.mainData.body,
                service.token
            )
    })
    
    it("register with same data",()=>{
        service.testingAccordingCustomValidation(
            "POST",
            url,
            service.token,
            service.mainData.body,
            "Data exists with email"
        )
    })

    it("register without token",()=>{
        service.testRequestWithNoToken(
            "POST",
            url
        )
    })

    it("register without body",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            service.token,
            {},
            "fullname"
        )
    })


    it("register with body without fullname",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            service.token,
            service.mainData.withoutFullname,
            "fullname"
        )
    })

    it("register with body without password",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            service.token,
            service.mainData.withoutPassword,
            "password"
        )
        
    })

    it("register with body without confirm password",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            service.token,
            service.mainData.withoutConfirmPassword,
            "confirm_password"
        )
    })

    it("register with body that password and confirm password different",()=>{
        service.testRequiredAttributeInCustomValidation(
            "POST",
            url,
            service.token,
            service.mainData.passwordAndConfirmPasswordDifferent,
            "\"confirm_password\" must be [ref:password]"
        )
    })


    it("language check for supported languages",()=>{
        service.langCheckForSupportedLangsInCreate(`${service.url}/register`)
    })

    it("send request without language in url",()=>{
        service.requestWithoutLangInUrlInSomeExceptions("GET",`${service.url}/register`)
    })

    it("language check for unsupported languages",()=>{
        service.langCheckForUnSupportedLangs("POST",`${service.url}/register`)
    })
   


})