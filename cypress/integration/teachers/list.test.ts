import { TeacherDataProps } from "../../types/teachers"
import "../../support/commands"

describe("News Get API tests",()=>{

    let token:string
    let id:string
    let mainData:TeacherDataProps

    before(()=>{
        cy.signIn()
            .then((res)=>{
                cy.register(res.token)
                cy.signIn2()
                    .then(res=>{
                        token = res.token
                        cy.teacherCreate(res.token)
                            .then(res=>{
                                id = res
                            })
                    })
            })
        
        cy.fixture("teachers/create")
            .then(data=>{
                mainData = data
            })

        
    })

    after(()=>{
        cy.task("removeUsers2")
            .then((res)=>{
                console.log(res);
            })

        cy.deleteRequest(`teacher/${id}/uz`,token)
    })

    it("check search in list API",()=>{
        cy.getRequest(`teacher/uz?fullname=${mainData.body.fullname}3423`)
        .then(res=>{
            expect(res.body.data.data).to.have.length(0)
        })
    })

    it("check search list2 in list API",()=>{
        cy.getRequest(`teacher/uz?title=${mainData.body.title}`)
        .then(res=>{
            expect(res.body.data.data[0]._id).exist
        })
    })

    it("check search list3 in list API",()=>{
        cy.getRequest(`teacher/uz?educationTitle=${mainData.body.educationTitle}`)
        .then(res=>{
            expect(res.body.data.data[0]._id).exist
        })
    })

    it("check search list3 in list API",()=>{
        cy.getRequest(`teacher/uz?email=${mainData.body.email}`)
        .then(res=>{
            expect(res.body.data.data[0]._id).exist
        })
    })

    it("send request without lang",()=>{
        cy.post("teacher",{},"",false)
        .then(res=>{
            expect(res.status).to.eq(404)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Route not found")
        })
    })

    it("send request with uz lang",()=>{
        cy.getRequest("teacher/uz")
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data.data).exist
            expect(res.body.data.data[0]._id).exist
        })
    })


    it("send request with ru lang",()=>{
        cy.getRequest("teacher/ru")
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data.data).exist
            expect(res.body.data.data[0]._id).exist
        })
    })

    it("send request with en lang",()=>{
        cy.getRequest("teacher/en")
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.data.data).exist
            expect(res.body.data.data[0]._id).exist
        })
    })

    it("send request with unsupported lang",()=>{
        cy.getRequest("teacher/de")
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Lang is not supported")
        })
    })

})