///<reference types="cypress"/>
import "../../support/commands"
import { AboutDataProps } from "../../types/about"


describe("About Create API tests",()=>{
    let token=""
    let mainData:AboutDataProps

    before(()=>{
        cy.signIn()
        .then((res)=>{
            cy.register(res.token)
            cy.signIn2()
                .then(res=>{
                    token = res.token
                })
        })

        cy.fixture("about/create")
            .then(data=>{
                mainData = data
            })
    })


    it("request without token",()=>{
        cy.post("/about/uz")
            .then(res=>{
                expect(res.status).to.eq(403)
                expect(res.body.error).to.eq(true)
                expect(res.body.message).to.eq("No token")
            })
    })

    it("request with empty body",()=>{
        cy.post("/about/uz",{},token)
            .then(res=>{
                expect(res.status).to.eq(400)
                expect(res.body.error).to.eq(true)
                expect(res.body.message).to.eq("\"desc\" is required")
            })
    })
    

    it("create only one data",()=>{
        cy.post("/about/uz",mainData.body,token)
            .then(res=>{
                expect(res.status).to.eq(400)
                expect(res.body.error).to.eq(true)
                expect(res.body.message).to.eq("Data exists")
            })
    })


    it("send request without lang",()=>{
        cy.post("about",{},"",false)
        .then(res=>{
            expect(res.status).to.eq(404)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Route not found")
        })
    })

    it("send request with uz lang",()=>{
        cy.post("about/uz",)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })


    it("send request with ru lang",()=>{
        cy.post("about/ru",{},"",false)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })

    it("send request with en lang",()=>{
        cy.post("about/en",{},"",false)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })

    it("send request with unsupported lang",()=>{
        cy.post("about/de",{},"",false)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Lang is not supported")
        })
    })



})