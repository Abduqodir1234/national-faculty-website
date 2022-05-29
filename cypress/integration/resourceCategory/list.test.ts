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
                    cy.resourceCategoryCreate(res.token)
                })
        })

        cy.fixture("resourceCategory/create")
            .then(data=>{
                mainData = data
            })
    })

    after(()=>{
        cy.task("removeUsers2")
            .then((res)=>{
                console.log(res);
            })

        cy.getRequest(`/resource/category/uz?name=${mainData.body.name}`)
            .then(res=>{
                res.body.data.data.forEach((one:{_id:string})=>{
                    cy.deleteRequest(`/majors/${one._id}/uz`,token)
                })
            })
    })


    it("check list search",()=>{
        cy.getRequest(`/resource/category/uz?name=${mainData.body.name}`)
        .then(res=>{
            expect(res.body.error).to.eq(false)
            expect(res.body.data.metadata.total).to.eq(1)
            expect(res.body.data.data).to.have.length(1)
        })
    })


    it("send request without lang",()=>{
        cy.post(`/resource/category/`)
        .then(res=>{
            expect(res.status).to.eq(404)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Route not found")
        })
    })

    it("send request with uz lang",()=>{
        cy.getRequest(`/resource/category/uz`)
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data.data).exist
            expect(res.body.data.metadata).exist
        })
    })


    it("send request with ru lang",()=>{
        cy.getRequest(`/resource/category/ru`)
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data.data).exist
            expect(res.body.data.metadata).exist
        })
    })

    it("send request with en lang",()=>{
        cy.getRequest(`/resource/category/en`)
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data.metadata).exist
        })
    })

    it("send request with unsupported lang",()=>{
        cy.getRequest("resource/category/de")
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Lang is not supported")
        })
    })



})