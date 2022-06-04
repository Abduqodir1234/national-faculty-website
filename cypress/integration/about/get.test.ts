
import AboutMainTestService from "../../IntegrationServices/about/main.service"

describe("About GET API tests",()=>{
    const service = new AboutMainTestService()

    it("language check for supported languages",()=>{
        service.langCheckForSupportedLangsInGetById(service.url)
    })

    it("send request without language in url",()=>{
        service.requestWithoutLangInUrl("GET",service.url)
    })

    it("language check for supported languages",()=>{
        service.langCheckForUnSupportedLangs("GET",service.url)
    })

    it("get working correctly",()=>{
        service.testGetByIdSuccess(`${service.url}/${service.supportedLangs[0]}`)
    })




})