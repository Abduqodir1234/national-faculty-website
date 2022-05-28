import "../../support/commands"
import { NewsDataProps } from "../../types/news"

describe("News Get API tests",()=>{

    let token:string
    let id:string
    let mainData:NewsDataProps

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

        cy.deleteRequest(`news/${id}/uz`,token)
    })

    it("check search in list API",()=>{
        cy.getRequest("news/uz?title=asdfa43432sdfasdf")
        .then(res=>{
            expect(res.body.data).to.have.length(0)
        })
    })

    it("check search list2 in list API",()=>{
        cy.getRequest(`news/uz?title=${mainData.body.title}&short_desc=${mainData.body.short_desc}`)
        .then(res=>{
            expect(res.body.data.data).to.have.length(1)
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
        cy.getRequest("news/uz")
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data.data).exist
            expect(res.body.data.data[0]._id).exist
        })
    })


    it("send request with ru lang",()=>{
        cy.getRequest("news/ru")
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data.data).exist
            expect(res.body.data.data[0]._id).exist
        })
    })

    it("send request with en lang",()=>{
        cy.getRequest("news/en")
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data.data).exist
            expect(res.body.data.data[0]._id).exist
        })
    })

    it("send request with unsupported lang",()=>{
        cy.getRequest("news/de")
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Lang is not supported")
        })
    })

})