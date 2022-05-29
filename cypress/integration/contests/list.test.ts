import "../../support/commands"
import { ContestDataProps } from "../../types/contest"
import { NewsDataProps } from "../../types/news"

describe("Contest Get API tests",()=>{

    let token:string
    let id:string
    let mainData:ContestDataProps

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
        
        cy.fixture("contest/create")
            .then(data=>{
                mainData = data
            })

        
    })

    after(()=>{
        cy.task("removeUsers2")
            .then((res)=>{
                console.log(res);
            })

        cy.deleteRequest(`contest/${id}/uz`,token)
    })

    it("check search in list API",()=>{
        cy.getRequest("contest/uz?title=asdfa43432sdfasdf")
        .then(res=>{
            expect(res.body.data).to.have.length(0)
        })
    })

    it("check search list2 in list API",()=>{
        cy.getRequest(`contest/uz?title=${mainData.body.title}`)
        .then(res=>{
            expect(res.body.data.data).to.have.length(1)
        })
    })

    it("send request without lang",()=>{
        cy.post("contest",{},"",false)
        .then(res=>{
            expect(res.status).to.eq(404)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Route not found")
        })
    })

    it("send request with uz lang",()=>{
        cy.getRequest("contest/uz")
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data.data).exist
            expect(res.body.data.data[0]._id).exist
        })
    })


    it("send request with ru lang",()=>{
        cy.getRequest("contest/ru")
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data.data).exist
            expect(res.body.data.data[0]._id).exist
        })
    })

    it("send request with en lang",()=>{
        cy.getRequest("contest/en")
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data.data).exist
            expect(res.body.data.data[0]._id).exist
        })
    })

    it("send request with unsupported lang",()=>{
        cy.getRequest("contest/de")
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Lang is not supported")
        })
    })

})