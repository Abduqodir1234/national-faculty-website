import "../../support/commands"
import { ContestDataProps } from "../../types/contest"


describe("Contest Create API tests",()=>{
    let mainData:ContestDataProps
    let token:string
    let img:File
    let id:string
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

        cy.fixture("contest/update")
            .then(data=>{
                mainData = data
            })

        cy.imageReturner()
            .then(data=>img=data)
    })

    after(()=>{
        cy.task("removeUsers2")
            .then((res)=>{
                console.log(res);
            })

        cy.getRequest(`/contest/uz?name=${mainData.body.title}`)
            .then(res=>{
                res?.body?.data?.data?.forEach((one:{_id:string})=>{
                    cy.deleteRequest(`/contest/${one._id}/uz`,token)
                })
            })
    })

    it("send request without token",()=>{
        cy.patch(`contest/${id}/uz`)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })

    it("check news update api working or not",()=>{
        const {date,desc,title} = mainData.body
        let data = new FormData()
        data.append("title",title)
        data.append("desc",desc)
        data.append("date",date)
        data.append("img",img)
        cy.patch(`contest/${id}/uz`,data,token)
        .then(res=>{
            const resBody = JSON.parse(Cypress.Blob.arrayBufferToBinaryString(res.body))
            expect(res.status).to.eq(200)
            expect(resBody.error).to.eq(false)
            expect(resBody.message).to.eq("Updated")
        })
    })

    it("send request with body without title",()=>{
        cy.patch(`contest/${id}/uz`,mainData.withoutTitle,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"title\" is required")
        })
    })

    it("send request with body with wrong type of title",()=>{
        cy.patch(`contest/${id}/uz`,mainData.withWrongTitle,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"title\" must be a string")
        })
    })

    it("send request with body with wrong type of desc",()=>{
        cy.patch(`contest/${id}/uz`,mainData.withWrongDesc,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"desc\" must be a string")
        })
    })

    it("send request with body with future date",()=>{
        cy.patch(`contest/${id}/uz`,mainData.withWrongDate,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"date\" must be less than or equal to \"now\"")
        })
    })

    it("send request with body without image",()=>{
        cy.patch(`contest/${id}/uz`,mainData.body,token)
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.message).to.eq("Updated")
        })
    })

    it("send request with body without desc",()=>{
        cy.patch(`contest/${id}/uz`,mainData.withoutDesc,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"desc\" is required")
        })
    })


    it("send request with body without date",()=>{
        cy.patch(`contest/${id}/uz`,mainData.withoutDate,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"date\" is required")
        })
    })

    it("send request without lang",()=>{
        cy.patch(`contest/${id}`,{},"",false)
        .then(res=>{
            expect(res.status).to.eq(404)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Route not found")
        })
    })

    it("send request with uz lang",()=>{
        cy.patch(`contest/${id}/uz`,)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })


    it("send request with ru lang",()=>{
        cy.patch(`contest/${id}/ru`,{},"",false)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })

    it("send request with en lang",()=>{
        cy.patch(`contest/${id}/en`,{},"",false)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })

    it("send request with unsupported lang",()=>{
        cy.patch(`contest/${id}/de`,{},"",false)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Lang is not supported")
        })
    })


})