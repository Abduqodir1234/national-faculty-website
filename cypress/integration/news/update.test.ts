import "../../support/commands"
import { NewsDataProps } from "../../types/news"

describe("News Update API tests",()=>{
    let mainData:NewsDataProps
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


        cy.fixture("news/update")
        .then(data=>{
            mainData =data
        })

        
    })

    after(()=>{
        cy.task("removeUsers2")
            .then((res)=>{
                console.log(res);
            })

        cy.deleteRequest(`news/${id}/uz`,token)
    })


    it("send request without token",()=>{
        cy.patch(`news/${id}/uz`)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })

    it("update api working correctly or not",()=>{
        cy.patch(`news/${id}/uz`,mainData.body,token)
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.message).to.eq("Updated")
        })
    })


    it("send request with body without title",()=>{
        cy.patch(`news/${id}/uz`,mainData.withoutTitle,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"title\" is required")
        })
    })

    it("send request with body without short_desc",()=>{
        cy.patch(`news/${id}/uz`,mainData.withoutShortDesc,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"short_desc\" is required")
        })
    })


    it("send request with body without desc",()=>{
        cy.patch(`news/${id}/uz`,mainData.withoutDesc,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"desc\" is required")
        })
    })

    it("send request with body without date",()=>{
        cy.patch(`news/${id}/uz`,mainData.withoutDate,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"date\" is required")
        })
    })


    it("send request without lang",()=>{
        cy.patch(`news/${id}`,{},"",false)
        .then(res=>{
            expect(res.status).to.eq(404)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Route not found")
        })
    })

    it("send request with uz lang",()=>{
        cy.patch(`news/${id}/uz`,)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })


    it("send request with ru lang",()=>{
        cy.patch(`news/${id}/ru`,{},"",false)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })

    it("send request with en lang",()=>{
        cy.patch(`news/${id}/en`,{},"",false)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })

    it("send request with unsupported lang",()=>{
        cy.patch(`news/${id}/de`,{},"",false)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Lang is not supported")
        })
    })


})