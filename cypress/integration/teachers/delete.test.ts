import "../../support/commands"

describe("Teacher Delete API tests",()=>{

    let token=""
    let id:string

    before(()=>{
        cy.signIn()
        .then((res)=>{
            cy.register(res.token)
            cy.signIn2()
                .then(res=>{
                    token = res.token
                    cy.teacherCreate(res.token)
                            .then(res=>{
                                id = res
                            })
                })
        })

    })

    after(()=>{
        cy.task("removeUsers2")
            .then((res)=>{
                console.log(res);
            })
    })


    it("check delete api working well or not",()=>{
        cy.deleteRequest(`/teacher/${id}/uz`,token)
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.message).to.eq("Deleted")
        })
    })

    it("send request without token",()=>{
        cy.deleteRequest(`/teacher/${id}/uz`)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })

    it("send request with unexist id",()=>{
        cy.deleteRequest(`/teacher/${123456789123}/uz`,token)
        .then(res=>{
            expect(res.status).to.eq(404)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Not found")
        })
    })

    it("send request without lang",()=>{
        cy.deleteRequest(`/teacher/${id}`)
        .then(res=>{
            expect(res.status).to.eq(404)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Route not found")
        })
    })

    it("send request with uz lang",()=>{
        cy.deleteRequest(`/teacher/${id}/uz`)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })


    it("send request with ru lang",()=>{
        cy.deleteRequest(`/teacher/${id}/ru`)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq('No token')
        })
    })

    it("send request with en lang",()=>{
        cy.deleteRequest(`/teacher/${id}/en`)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })

    it("send request with unsupported lang",()=>{
        cy.deleteRequest(`teacher/${id}/de`)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Lang is not supported")
        })
    })

})