import { MajorsDataProps } from "../../types/majors"
import "../../support/commands"
describe("Majors Update API tests",()=>{
    let token=""
    let mainData:MajorsDataProps
    let id:string

    before(()=>{
        cy.signIn()
        .then((res)=>{
            cy.register(res.token)
            cy.signIn2()
                .then(res=>{
                    token = res.token
                    cy.majorCreate(res.token)
                            .then(res=>{
                                id = res
                            })
                })
        })

        cy.fixture("majors/update")
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


    it("send request without token",()=>{
        cy.patch(`/majors/${id}/uz`)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })

    it("send request with empty body",()=>{
        cy.patch(`/majors/${id}/uz`,{},token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"name\" is required")
        })
    })

    it("update api working well or not",()=>{
        cy.patch(`/majors/${id}/uz`,mainData.body,token)
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.message).to.eq("Updated")
        })
    })


    it("send request without lang",()=>{
        cy.patch(`/majors/${id}`,{},"",false)
        .then(res=>{
            expect(res.status).to.eq(404)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Route not found")
        })
    })

    it("send request with uz lang",()=>{
        cy.patch(`/majors/${id}/uz`)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })


    it("send request with ru lang",()=>{
        cy.patch(`/majors/${id}/ru`)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })

    it("send request with en lang",()=>{
        cy.patch(`/majors/${id}/en`)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })

    it("send request with unsupported lang",()=>{
        cy.patch(`majors/${id}/de`)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Lang is not supported")
        })
    })
})