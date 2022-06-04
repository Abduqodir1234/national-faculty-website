///<reference types="cypress"/>
import MainInfosMainTestService from "../../IntegrationServices/mainInfos/main.service"
import "../../support/commands"

describe("Main Infos GET API tests",()=>{
    const service = new MainInfosMainTestService()
    const url = `${service.url}/${service.supportedLangs[0]}`

    before(()=>{
        service.beforeAll()
    })

    after(()=>{
        service.afterAll()
    })
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