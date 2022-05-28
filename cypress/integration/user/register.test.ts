import { RegisterDataProps } from "../../types/user"
import "../../support/commands"
describe("User Register API tests",()=>{
    let token = ""
    let  mainData:RegisterDataProps

    before(()=>{
        cy.signIn()
        .then((res)=>{
            token = res.token
        })
        cy.fixture("/user/register.json")
        .then((data)=>{
            mainData = data
        })

    })

    after(()=>{
        cy.task("removeUsers2")
        .then((res)=>{
            console.log(res);
        })
    })
    
    it("check register working correctly",()=>{
            cy.post("user/register/uz",mainData.body,token)
            .then(res=>{
                expect(res.status).to.eq(201)
                expect(res.body.error).to.eq(false)
                expect(res.body.message).to.eq("created")
            })
    })
    
    it("register with same data",()=>{
        cy.post("user/register/uz",mainData.body,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Data exists with email")
        })
    })

    it("register without token",()=>{
        cy.post("user/register/uz",mainData.body)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })

    it("register without body",()=>{
        cy.post("user/register/uz",{},token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"fullname\" is required")
        })
    })


    it("register with body without fullname",()=>{
        cy.post("user/register/uz",mainData.withoutFullname,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"fullname\" is required")
        })
    })

    it("register with body without password",()=>{
        cy.post("user/register/uz",mainData.withoutPassword,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"password\" is required")
        })
    })

    it("register with body without confirm password",()=>{
        cy.post("user/register/uz",mainData.withoutConfirmPassword,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"confirm_password\" is required")
        })
    })

    it("register with body without confirm password",()=>{
        cy.post("user/register/uz",mainData.withoutConfirmPassword,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"confirm_password\" is required")
        })
    })

    it("register with body that password and confirm password different",()=>{
        cy.post("user/register/uz",mainData.passwordAndConfirmPasswordDifferent,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"confirm_password\" must be [ref:password]")
        })
    })



    it("send request without lang",()=>{
        cy.post("user/register",{},"",false)
        .then(res=>{
            expect(res.status).to.eq(404)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Route not found")
        })
    })

    it("send request with uz lang",()=>{
        cy.post("user/register/uz",)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })


    it("send request with ru lang",()=>{
        cy.post("user/register/ru",{},"",false)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })

    it("send request with en lang",()=>{
        cy.post("user/register/en",{},"",false)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })

    it("send request with unsupported lang",()=>{
        cy.post("user/register/de",{},"",false)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Lang is not supported")
        })
    })



})