import "../../support/commands"
import { NewsDataProps } from "../../types/news"

describe("News Create API tests",()=>{

    let token=""
    let mainData:NewsDataProps

    before(()=>{
        cy.signIn()
        .then((res)=>{
            cy.register(res.token)
            cy.signIn2()
                .then(res=>{
                    token = res.token
                })
        })

        cy.fixture("news/create")
            .then(data=>{
                mainData = data
            })
    })

    after(()=>{
        cy.task("removeUsers2")
            .then((res)=>{
                console.log(res);
            })

        cy.getRequest(`/news/uz?title=${mainData.body.title}&short_desc=${mainData.body.short_desc}`)
            .then(res=>{
                res.body.data.data.forEach((one:{_id:string})=>{
                    cy.deleteRequest(`/news/${one._id}/uz`,token)
                })
            })
    })

    it("send request without token",()=>{
        cy.post("news/uz",)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })

    it("check news create api working or not",()=>{
        cy.post("news/uz",mainData.body,token)
        .then(res=>{
            expect(res.status).to.eq(201)
            expect(res.body.error).to.eq(false)
            expect(res.body.message).to.eq("created")
        })
    })

    it("send request with body without title",()=>{
        cy.post("news/uz",mainData.withoutTitle,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"title\" is required")
        })
    })

    it("send request with body without short_desc",()=>{
        cy.post("news/uz",mainData.withoutShortDesc,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"short_desc\" is required")
        })
    })


    it("send request with body without desc",()=>{
        cy.post("news/uz",mainData.withoutDesc,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"desc\" is required")
        })
    })

    it("send request with body without date",()=>{
        cy.post("news/uz",mainData.withoutDate,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"date\" is required")
        })
    })


    it("send request without lang",()=>{
        cy.post("news",{},"",false)
        .then(res=>{
            expect(res.status).to.eq(404)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Route not found")
        })
    })

    it("send request with uz lang",()=>{
        cy.post("news/uz",)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })


    it("send request with ru lang",()=>{
        cy.post("news/ru",{},"",false)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })

    it("send request with en lang",()=>{
        cy.post("news/en",{},"",false)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })

    it("send request with unsupported lang",()=>{
        cy.post("news/de",{},"",false)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Lang is not supported")
        })
    })






})