import { AboutDataProps } from "../../types/about"
import "../../support/commands"

describe("About Update API tests",()=>{
    let token=""
    let mainData:AboutDataProps
    let oldData:string

    before(()=>{
        cy.signIn()
        .then((res)=>{
            cy.register(res.token)
            cy.signIn2()
                .then(res=>{
                    token = res.token
                })
        })

        cy.fixture("about/update")
            .then(data=>{
                mainData = data
            })
        
        cy.getRequest("/about/uz",)
        .then(res=>{
            oldData = res.body.data.desc
        })
    })

    after(()=>{
        cy.patch("about/uz",{desc:oldData},token,false)
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.message).to.eq("Updated")
        })

        cy.task("removeUsers2")
            .then((res)=>{
                console.log(res);
            })
    })


    it("update with empty body",()=>{
        cy.patch("about/uz",{},token,false)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"desc\" is required")
        })
    })


    it("update working correctly or not",()=>{
        cy.patch("about/uz",mainData.body,token,false)
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.message).to.eq("Updated")
        })
    })

    it("update without token",()=>{
        cy.patch("about/uz",{},"",false)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })

    it("send request without lang",()=>{
        cy.patch("about",{},"",false)
        .then(res=>{
            expect(res.status).to.eq(404)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Route not found")
        })
    })

    it("send request with uz lang",()=>{
        cy.patch("about/uz",)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })


    it("send request with ru lang",()=>{
        cy.patch("about/ru",{},"",false)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })

    it("send request with en lang",()=>{
        cy.patch("about/en",{},"",false)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })

    it("send request with unsupported lang",()=>{
        cy.patch("about/de",{},"",false)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Lang is not supported")
        })
    })


})