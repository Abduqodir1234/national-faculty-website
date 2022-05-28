///<reference types="cypress"/>
import "../../support/commands"

describe("Main Infos GET API tests",()=>{

    let token = ""

    it("get working correctly",()=>{
        cy.getRequest("/main/infos/uz",)
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data).exist
            expect(res.body.data._id).exist
        })
    })

    it("send request without lang",()=>{
        cy.getRequest("/main/infos/",token,false)
        .then(res=>{
            expect(res.status).to.eq(404)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Route not found")
        })
    })

    it("send request with uz lang",()=>{
        cy.getRequest("/main/infos/uz","",false)
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data).exist
            expect(res.body.data._id).exist
        })
    })


    it("send request with ru lang",()=>{
        cy.getRequest("/main/infos/ru","",false)
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data).exist
            expect(res.body.data._id).exist
        })
    })

    it("send request with en lang",()=>{
        cy.getRequest("/main/infos/en","",false)
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data).exist
            expect(res.body.data._id).exist
        })
    })

    it("send request with de lang",()=>{
        cy.getRequest("/main/infos/de","",false)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Lang is not supported")
            
        })
    })


})