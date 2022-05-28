import { LoginDataProps } from "../../types/user"
import "../../support/commands"
describe("User Login API tests",()=>{
    const token = ""

    let mainData:LoginDataProps

    before(()=>{
        cy.fixture("/user/login.json")
        .then(data=>{
            mainData = data
        })
    })


    it("check login working correctly",()=>{
        cy.signIn()
    })

    it("send data to api without email",()=>{
        cy.post("user/login/uz",mainData.withoutEmail,token)
        .then((res)=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"email\" is required")
        })
    })

    

    it("send data to api without password",()=>{
        cy.post("user/login/uz",mainData.withoutPassword,token)
        .then((res)=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"password\" is required")
        })
    })

    it("send data to api without body",()=>{
        cy.post("user/login/uz",{},token)
        .then((res)=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"email\" is required")
        })
    })


    it("send data to api with wrong email",()=>{
        cy.post("user/login/uz",mainData.wrongEmail,token)
        .then((res)=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"email\" must be a valid email")
        })
    })

    it("send data to api with wrong password",()=>{
        cy.post("user/login/uz",mainData.wrongPassword,token)
        .then((res)=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"password\" must be a string")
        })
    })


    it("send request without lang",()=>{
        cy.post("user/login",{},token,false)
        .then(res=>{
            expect(res.status).to.eq(404)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Route not found")
        })
    })

    it("send request with uz lang",()=>{
        cy.post("user/login/uz",{},"",false)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"email\" is required")
        })
    })


    it("send request with ru lang",()=>{
        cy.post("/user/login/ru",{},"",false)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"email\" is required")
        })
    })

    it("send request with en lang",()=>{
        cy.post("/user/login/en",{},"",false)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"email\" is required")
        })
    })

    it("send request with unsupported lang",()=>{
        cy.post("/user/login/de",{},"",false)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Lang is not supported")
        })
    })


})