import { UpdateDataProps } from "../../types/user"
import "../../support/commands"
describe("User Update API tests",()=>{

    let token = ""
    let mainData:UpdateDataProps

    before(()=>{
        cy.signIn()
            .then(res=>{
                cy.register(res.token)
                cy.signIn2()
                .then(res=>{
                    token = res.token
                })
            })

        cy.fixture("user/update.json")
            .then(data=>{
                mainData = data
            })
    })

    after(()=>{
        cy.task("removeUsers2")
        .then((res)=>{
            console.log(res);
        })
    })

    it("update without token",()=>{
        cy.patch("/user/uz",{})
            .then(res=>{
                expect(res.status).to.eq(403)
                expect(res.body.error).to.eq(true)
                expect(res.body.message).to.eq("No token")
            })
    })

    it("update working correctly",()=>{
        cy.patch("/user/uz",mainData.body,token)
            .then(res=>{
                expect(res.status).to.eq(200)
                expect(res.body.error).to.eq(false)
                expect(res.body.message).to.eq("Updated")
            })
    })

    it("update with the same email that exists before",()=>{
        cy.patch("/user/uz",mainData.withSameEmail,token)
            .then(res=>{
                expect(res.status).to.eq(400)
                expect(res.body.error).to.eq(true)
                expect(res.body.message).to.eq("User exists with this email")
            })
    })


    it("update with body without fullname",()=>{
        cy.patch("user/uz",mainData.withoutFullname,token)
            .then(res=>{
                expect(res.status).to.eq(400)
                expect(res.body.error).to.eq(true)
                expect(res.body.message).to.eq("\"fullname\" is required")
            })
    })

    it("update with body without email",()=>{
        cy.patch("user/uz",mainData.withoutEmail,token)
            .then(res=>{
                expect(res.status).to.eq(400)
                expect(res.body.error).to.eq(true)
                expect(res.body.message).to.eq("\"email\" is required")
            })
    })

    it("update with body with wrong email",()=>{
        cy.patch("user/uz",mainData.withtWrongEmail,token)
            .then(res=>{
                expect(res.status).to.eq(400)
                expect(res.body.error).to.eq(true)
                expect(res.body.message).to.eq("\"email\" must be a valid email")
            })
    })



    it("send request without lang",()=>{
        cy.patch("user",{},token,false)
        .then(res=>{
            expect(res.status).to.eq(404)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Route not found")
        })
    })

    it("send request with uz lang",()=>{
        cy.patch("user/uz",{},"",false)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })


    it("send request with ru lang",()=>{
        cy.patch("user/ru",{},"",false)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })

    it("send request with en lang",()=>{
        cy.patch("user/en",{},"",false)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })

    it("send request with unsupported lang",()=>{
        cy.patch("user/de",{},"",false)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Lang is not supported")
        })
    })

})