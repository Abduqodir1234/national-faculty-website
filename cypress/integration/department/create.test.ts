import "../../support/commands"
import { DepartmentDataProps } from "../../types/department"

describe("Department Create API tests",()=>{

    let token=""
    let mainData:DepartmentDataProps

    before(()=>{
        cy.signIn()
        .then((res)=>{
            cy.register(res.token)
            cy.signIn2()
                .then(res=>{
                    token = res.token
                })
        })

        cy.fixture("department/create")
            .then(data=>{
                mainData = data
            })
    })

    after(()=>{
        cy.task("removeUsers2")
            .then((res)=>{
                console.log(res);
            })

        cy.getRequest(`/department/uz?name=${mainData.body.name}`)
            .then(res=>{
                res?.body?.data?.data?.forEach((one:{_id:string})=>{
                    cy.deleteRequest(`/department/${one._id}/uz`,token)
                })
            })
    })


    it("send without token",()=>{
        cy.post("/department/uz")
            .then(res=>{
                expect(res.status).to.eq(403)
                expect(res.body.error).to.eq(true)
                expect(res.body.message).to.eq("No token")
            })
    })

    it("create api working or not",()=>{
        cy.post("/department/uz",mainData.body,token)
            .then(res=>{
                expect(res.body.error).to.eq(false)
                expect(res.status).to.eq(201)
                expect(res.body.message).to.eq('created')
            })
    })

    it("send request with empty body",()=>{
        cy.post("/department/uz",{},token)
            .then(res=>{
                expect(res.status).to.eq(400)
                expect(res.body.error).to.eq(true)
                expect(res.body.message).to.eq("\"name\" is required")
            })
    })

    it("send request with body without name",()=>{
        cy.post("department/uz",mainData.withoutName,token)
            .then(res=>{
                expect(res.status).to.eq(400)
                expect(res.body.error).to.eq(true)
                expect(res.body.message).to.eq("\"name\" is required")
            })
    })

    it("send request with body without desc",()=>{
        cy.post("department/uz",mainData.withoutDesc,token)
            .then(res=>{
                expect(res.status).to.eq(400)
                expect(res.body.error).to.eq(true)
                expect(res.body.message).to.eq("\"desc\" is required")
            })
    })

    it("send request with body without address",()=>{
        cy.post("department/uz",mainData.withoutAddress,token)
            .then(res=>{
                expect(res.status).to.eq(400)
                expect(res.body.error).to.eq(true)
                expect(res.body.message).to.eq("\"address\" is required")
            })
    })

    it("send request without lang",()=>{
        cy.post("department")
        .then(res=>{
            expect(res.status).to.eq(404)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Route not found")
        })
    })

    it("send request with uz lang",()=>{
        cy.post("department/uz",)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })


    it("send request with ru lang",()=>{
        cy.post("department/ru")
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })

    it("send request with en lang",()=>{
        cy.post("department/en")
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })

    it("send request with unsupported lang",()=>{
        cy.post("department/de")
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Lang is not supported")
        })
    })


})