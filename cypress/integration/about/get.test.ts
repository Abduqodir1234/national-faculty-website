///<reference types="cypress"/>
import "../../support/commands"

describe("About GET API tests",()=>{

    let token = ""

    it("get working correctly",()=>{
        cy.getRequest("/about/uz",)
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data).exist
            expect(res.body.data.desc).exist
        })
    })

    it("send request without lang",()=>{
        cy.getRequest("/about/",token,false)
        .then(res=>{
            expect(res.status).to.eq(404)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Route not found")
        })
    })

    it("send request with uz lang",()=>{
        cy.getRequest("/about/uz","",false)
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data).exist
            expect(res.body.data.desc).exist
        })
    })


    it("send request with ru lang",()=>{
        cy.getRequest("/about/ru","",false)
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data).exist
            expect(res.body.data.desc).exist
        })
    })

    it("send request with en lang",()=>{
        cy.getRequest("/about/en","",false)
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data).exist
            expect(res.body.data.desc).exist
        })
    })

    it("send request with de lang",()=>{
        cy.getRequest("/about/de","",false)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Lang is not supported")
            
        })
    })


})