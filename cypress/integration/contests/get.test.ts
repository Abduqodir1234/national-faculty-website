import "../../support/commands"

describe("Contest list API tests",() => {
    let token:string
    let id:string

    before(()=>{
        cy.signIn()
            .then((res)=>{
                cy.register(res.token)
                cy.signIn2()
                    .then(res=>{
                        token = res.token
                        cy.contestCreate(res.token)
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

        cy.deleteRequest(`contest/${id}/uz`,token)
    })

    it("get api working correctly or not ",()=>{
        cy.getRequest(`/contest/${id}/uz`)
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data._id).exist
        })
    })


    it("send unexist id",()=>{
        cy.getRequest(`/contest/${123456789123}/uz`)
        .then(res=>{
            expect(res.status).to.eq(404)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Not found")
        })
    })


    it("send request without lang",()=>{
        cy.post(`/contest/${id}`,{},"",false)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Lang is not supported")
        })
    })

    it("send request with uz lang",()=>{
        cy.getRequest(`/contest/${id}/uz`)
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data._id).exist
        })
    })


    it("send request with ru lang",()=>{
        cy.getRequest(`/contest/${id}/ru`)
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data._id).exist
        })
    })

    it("send request with en lang",()=>{
        cy.getRequest(`/contest/${id}/en`)
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data._id).exist
        })
    })

    it("send request with unsupported lang",()=>{
        cy.getRequest(`contest/${id}/de`)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Lang is not supported")
        })
    })


})