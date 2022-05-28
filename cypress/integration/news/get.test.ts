import "../../support/commands"

describe("News list API tests",() => {
    let token:string
    let id:string

    before(()=>{
        cy.signIn()
            .then((res)=>{
                cy.register(res.token)
                cy.signIn2()
                    .then(res=>{
                        token = res.token
                        cy.newsCreate(res.token)
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

        cy.deleteRequest(`news/${id}/uz`,token)
    })

    it("get api working correctly or not ",()=>{
        cy.getRequest(`/news/${id}/uz`)
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data._id).exist
        })
    })


    it("send unexist id",()=>{
        cy.getRequest(`/news/${123456789123}/uz`)
        .then(res=>{
            expect(res.status).to.eq(404)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Not found")
        })
    })


    it("send request without lang",()=>{
        cy.post(`/news/${id}`,{},"",false)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Lang is not supported")
        })
    })

    it("send request with uz lang",()=>{
        cy.getRequest(`/news/${id}/uz`)
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data._id).exist
        })
    })


    it("send request with ru lang",()=>{
        cy.getRequest(`/news/${id}/ru`)
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data._id).exist
        })
    })

    it("send request with en lang",()=>{
        cy.getRequest(`/news/${id}/en`)
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data._id).exist
        })
    })

    it("send request with unsupported lang",()=>{
        cy.getRequest(`news/${id}/de`)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Lang is not supported")
        })
    })


})