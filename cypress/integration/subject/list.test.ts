import "../../support/commands"
import { SubjectDataProps } from "../../types/subject"


describe("Subject list API tests",()=>{

    let token=""
    let mainData:SubjectDataProps
    let id:string

    before(()=>{
        cy.signIn()
        .then((res)=>{
            cy.register(res.token)
            cy.signIn2()
                .then(res=>{
                    token = res.token
                    cy.subjectCreate(res.token)
                            .then(res=>{
                                id = res
                            })
                })
        })

        cy.fixture("subject/create")
            .then(data=>{
                mainData = data
            })
    })

    after(()=>{
        cy.task("removeUsers2")
            .then((res)=>{
                console.log(res);
            })

        cy.getRequest(`/subject/uz?name=${mainData.body.name}`)
            .then(res=>{
                res.body.data.data.forEach((one:{_id:string})=>{
                    cy.deleteRequest(`/subject/${one._id}/uz`,token)
                })
            })
    })


    it("check list search",()=>{
        cy.getRequest(`/subject/uz?name=${mainData.body.name}`)
        .then(res=>{
            expect(res.body.error).to.eq(false)
            expect(res.body.data.metadata.total).to.eq(1)
            expect(res.body.data.data).to.have.length(1)
        })
    })


    it("send request without lang",()=>{
        cy.post(`/subject/`)
        .then(res=>{
            expect(res.status).to.eq(404)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Route not found")
        })
    })

    it("send request with uz lang",()=>{
        cy.getRequest(`/subject/uz`)
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data.data).exist
            expect(res.body.data.metadata).exist
        })
    })


    it("send request with ru lang",()=>{
        cy.getRequest(`/subject/ru`)
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data.data).exist
            expect(res.body.data.metadata).exist
        })
    })

    it("send request with en lang",()=>{
        cy.getRequest(`/subject/en`)
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data.metadata).exist
        })
    })

    it("send request with unsupported lang",()=>{
        cy.getRequest("subject/de")
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Lang is not supported")
        })
    })


})