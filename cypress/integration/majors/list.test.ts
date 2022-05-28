import "../../support/commands"
import { MajorsDataProps } from "../../types/majors"

describe("Majors List API tests",()=>{
    let token=""
    let mainData:MajorsDataProps

    before(()=>{
        cy.signIn()
        .then((res)=>{
            cy.register(res.token)
            cy.signIn2()
                .then(res=>{
                    token = res.token
                    cy.majorCreate(res.token)
                })
        })

        cy.fixture("majors/create")
            .then(data=>{
                mainData = data
            })
    })

    after(()=>{
        cy.task("removeUsers2")
            .then((res)=>{
                console.log(res);
            })

        cy.getRequest(`/majors/uz?name=${mainData.body.name}`)
            .then(res=>{
                res.body.data.data.forEach((one:{_id:string})=>{
                    cy.deleteRequest(`/majors/${one._id}/uz`,token)
                })
            })
    })


    it("check list search",()=>{
        cy.getRequest(`/majors/uz?name=${mainData.body.name}`)
        .then(res=>{
            expect(res.body.error).to.eq(false)
            expect(res.body.data.metadata.total).to.eq(1)
            expect(res.body.data.data).to.have.length(1)
        })
    })


    it("send request without lang",()=>{
        cy.post(`/majors/`)
        .then(res=>{
            expect(res.status).to.eq(404)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Route not found")
        })
    })

    it("send request with uz lang",()=>{
        cy.getRequest(`/majors/uz`)
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data.data).exist
            expect(res.body.data.metadata).exist
        })
    })


    it("send request with ru lang",()=>{
        cy.getRequest(`/majors/ru`)
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data.data).exist
            expect(res.body.data.metadata).exist
        })
    })

    it("send request with en lang",()=>{
        cy.getRequest(`/majors/en`)
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data.metadata).exist
        })
    })

    it("send request with unsupported lang",()=>{
        cy.getRequest("majors/de")
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Lang is not supported")
        })
    })



})