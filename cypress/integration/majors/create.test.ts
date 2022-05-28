import "../../support/commands"
import { MajorsDataProps } from "../../types/majors"

describe("Major Create API tests",()=>{

    let token=""
    let mainData:MajorsDataProps

    before(()=>{
        cy.signIn()
        .then((res)=>{
            cy.register(res.token)
            cy.signIn2()
                .then(res=>{
                    token = res.token
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
                res?.body?.data?.data?.forEach((one:{_id:string})=>{
                    cy.deleteRequest(`/majors/${one._id}/uz`,token)
                })
            })
    })


    it("create api working correctly or not",()=>{
        cy.post("/majors/uz",mainData.body,token)
        .then(res=>{
            expect(res.status).to.eq(201)
            expect(res.body.error).to.eq(false)
            expect(res.body.message).to.eq("created")
        })
    })


    it("send request with empty body",()=>{
        cy.post("majors/uz",{},token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"name\" is required")
        })
    })

    it("send request without token",()=>{
        cy.post("majors/uz")
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })


    it("send request without lang",()=>{
        cy.post("majors")
        .then(res=>{
            expect(res.status).to.eq(404)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Route not found")
        })
    })

    it("send request with uz lang",()=>{
        cy.post("majors/uz",)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })


    it("send request with ru lang",()=>{
        cy.post("majors/ru")
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })

    it("send request with en lang",()=>{
        cy.post("majors/en")
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })

    it("send request with unsupported lang",()=>{
        cy.post("majors/de")
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Lang is not supported")
        })
    })


})