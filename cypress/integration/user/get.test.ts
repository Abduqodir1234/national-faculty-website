import "../../support/commands"

describe("User Get API tests",() => {

    let token = ""

    before(()=>{
        cy.signIn()
            .then(res=>{
                token = res.token
            })
    })


    it("Get user with token",()=>{
        cy.getRequest("/user/uz",token)
            .then(res=>{
                expect(res.status).to.eq(200)
                expect(res.body.error).to.eq(false)
                expect(res.body.data._id).exist
            })
    })

    it("Get user without token",()=>{
        cy.getRequest("/user/uz","")
            .then(res=>{
                expect(res.status).to.eq(403)
                expect(res.body.error).to.eq(true)
                expect(res.body.message).to.eq("No token")
            })
    })

    it("send request without lang",()=>{
        cy.getRequest("/user/",token,false)
        .then(res=>{
            expect(res.status).to.eq(404)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Route not found")
        })
    })

    it("send request with uz lang",()=>{
        cy.getRequest("/user/uz","",false)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })


    it("send request with ru lang",()=>{
        cy.getRequest("/user/ru","",false)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })

    it("send request with en lang",()=>{
        cy.getRequest("/user/en","",false)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })

    it("send request with de lang",()=>{
        cy.getRequest("/user/de","",false)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Lang is not supported")
        })
    })

})