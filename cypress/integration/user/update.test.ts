import { UpdateDataProps } from "../../types/user"
import "../../support/commands"
import UserMainTestService from "../../IntegrationServices/user/main.service"
describe("User Update API tests",()=>{

    const service = new UserMainTestService()
    let url = `${service.url}/${service.supportedLangs[0]}`

    before(()=>{
        service.beforeAll()
            .then(()=>{
                cy.register(service.token)
                return cy.signIn2()
            })
            .then((res:{token:string})=>{
                service.token = res.token
            })
    })

    after(()=>service.afterAll())

it("check update working correctly",()=>{
    delete service.mainData.body.password
    delete service.mainData.body.confirm_password
        service.testUpdateSuccess(
            url,
            service.mainData.body,
            service.token
        )
})



it("update without token",()=>{
    service.testRequestWithNoToken(
        "PATCH",
        url
    )
})

it("update without body",()=>{
    service.testRequiredAttribute(
        "PATCH",
        url,
        service.token,
        {},
        "fullname"
    )
})


it("update with body without fullname",()=>{
    service.testRequiredAttribute(
        "PATCH",
        url,
        service.token,
        service.mainData.withoutFullname,
        "fullname"
    )
})



it("language check for supported languages",()=>{
    service.langCheckForSupportedLangsInUpdate(`${service.url}`)
})

it("send request without language in url",()=>{
    service.requestWithoutLangInUrl("GET",`${service.url}`)
})

it("language check for unsupported languages",()=>{
    service.langCheckForUnSupportedLangs("PATCH",`${service.url}`)
})
})