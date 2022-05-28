
import "../../support/commands"
import { SubjectDataProps } from "../../types/subject"


describe("Subject Get API tests",()=>{

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

    it("get api working well or not",()=>{
        cy.getRequest(`/subject/${id}/uz`)
        .then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data._id).exist
        })
    })

    it("send request with nonexist id",()=>{
        cy.getRequest(`/subject/${123456789123}/uz`)
        .then((res)=>{
            expect(res.status).to.eq(404)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Not found")
        })
    })

    it("send request without lang",()=>{
        cy.post(`/subject/${id}`,{},"",false)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Lang is not supported")
        })
    })

    it("send request with uz lang",()=>{
        cy.getRequest(`/subject/${id}/uz`)
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data._id).exist
        })
    })


    it("send request with ru lang",()=>{
        cy.getRequest(`/subject/${id}/ru`)
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data._id).exist
        })
    })

    it("send request with en lang",()=>{
        cy.getRequest(`/subject/${id}/en`)
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data._id).exist
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