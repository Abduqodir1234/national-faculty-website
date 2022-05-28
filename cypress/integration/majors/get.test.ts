import { MajorsDataProps } from "../../types/majors"
import "../../support/commands"
describe("Majors Get API tests",()=>{
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

    it("get api working well or not",()=>{
        cy.getRequest(`/majors/${id}/uz`)
        .then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data._id).exist
        })
    })

    it("send request with nonexist id",()=>{
        cy.getRequest(`/majors/${123456789123}/uz`)
        .then((res)=>{
            expect(res.status).to.eq(404)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Not found")
        })
    })

    it("send request without lang",()=>{
        cy.post(`/majors/${id}`,{},"",false)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Lang is not supported")
        })
    })

    it("send request with uz lang",()=>{
        cy.getRequest(`/majors/${id}/uz`)
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data._id).exist
        })
    })


    it("send request with ru lang",()=>{
        cy.getRequest(`/majors/${id}/ru`)
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data._id).exist
        })
    })

    it("send request with en lang",()=>{
        cy.getRequest(`/majors/${id}/en`)
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data._id).exist
        })
    })

    it("send request with unsupported lang",()=>{
        cy.getRequest(`majors/${id}/de`)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Lang is not supported")
        })
    })
})