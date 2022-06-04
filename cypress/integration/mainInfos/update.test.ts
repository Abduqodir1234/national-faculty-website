import MainInfosMainTestService from "../../IntegrationServices/mainInfos/main.service"
import "../../support/commands"
import { MainInfosDataProps } from "../../types/mainInfos"

describe("Main Infos API tests",()=>{
    const service = new MainInfosMainTestService()
    const url = `${service.url}/${service.supportedLangs[0]}`
    let oldData:MainInfosDataProps["updateOldDataProps"]

    before(()=>{
        service.beforeAll()

        cy.getRequest("/main/infos/uz")
            .then(res=>{
                oldData = res.body.data
            })
    })

    after(()=>{
        delete oldData._id
        delete oldData.img
        cy.patch("main/infos/uz",{...oldData},service.token,false)
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.message).to.eq("Updated")
        })

        service.afterAll()
    })


    it("request without token",()=>{
        service.testRequestWithNoToken(
            "PATCH",
            url
        )
    })

    it("request with empty body",()=>{
        service.testRequiredAttribute(
            "PATCH",
            url,
            service.token,
            {},
            "email"
        )
    })
    

    it("update",()=>{
        service.testUpdateSuccess(
            url,
            service.mainData.body,
            service.token
        )
    })

    it("send request with body without email",()=>{
        service.testRequiredAttribute(
            "PATCH",
            url,
            service.token,
            service.mainData.withoutEmail,
            "email"
        )
    })

    it("send request with body without phoneNumber",()=>{
        service.testRequiredAttribute(
            "PATCH",
            url,
            service.token,
            service.mainData.withoutPhoneNumber,
            "phoneNumber"
        )
    })


    it("send request with body without address",()=>{
        service.testRequiredAttribute(
            "PATCH",
            url,
            service.token,
            service.mainData.withoutAddress,
            "address"
        )
    })


    it("send request with body without startWork",()=>{
        service.testRequiredAttribute(
            "PATCH",
            url,
            service.token,
            service.mainData.withoutStartWork,
            "startWork"
        )
    })


    it("send request with body without endWork",()=>{
        service.testRequiredAttribute(
            "PATCH",
            url,
            service.token,
            service.mainData.withoutEndWork,
            "endWork"
        )
    })

    it("language check for supported languages",()=>{
        service.langCheckForSupportedLangsInUpdate(service.url)
    })

    it("send request without language in url",()=>{
        service.langCheckForUnSupportedLangs("PATCH",service.url)
    })

    it("language check for supported languages",()=>{
        service.langCheckForUnSupportedLangs("PATCH",service.url)
    })
})