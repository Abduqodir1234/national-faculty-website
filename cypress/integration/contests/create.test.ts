import "../../support/commands"
import { ContestDataProps } from "../../types/contest"


describe("Contest Create API tests",()=>{
    let mainData:ContestDataProps
    let token:string
    let img:File
    before(()=>{
        cy.signIn()
        .then((res)=>{
            cy.register(res.token)
            cy.signIn2()
                .then(res=>{
                    token = res.token
                })
        })

        cy.fixture("contest/create")
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
        cy.post("contest/uz")
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })

    it("check news create api working or not",()=>{
        const {date,desc,title} = mainData.body
        let data = new FormData()
        data.append("title",title)
        data.append("desc",desc)
        data.append("date",date)
        data.append("img",img)
        cy.post("contest/uz",data,token)
        .then(res=>{
            const resBody = JSON.parse(Cypress.Blob.arrayBufferToBinaryString(res.body))
            expect(res.status).to.eq(201)
            expect(resBody.error).to.eq(false)
            expect(resBody.message).to.eq("created")
        })
    })

    it("send request with body without title",()=>{
        cy.post("contest/uz",mainData.withoutTitle,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"title\" is required")
        })
    })

    it("send request with body with wrong type of title",()=>{
        cy.post("contest/uz",mainData.withWrongTitle,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"title\" must be a string")
        })
    })

    it("send request with body with wrong type of desc",()=>{
        cy.post("contest/uz",mainData.withWrongDesc,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"desc\" must be a string")
        })
    })

    it("send request with body with future date",()=>{
        cy.post("contest/uz",mainData.withWrongDate,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"date\" must be less than or equal to \"now\"")
        })
    })

    it("send request with body without image",()=>{
        cy.post("contest/uz",mainData.body,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Image is required")
        })
    })

    it("send request with body without desc",()=>{
        cy.post("contest/uz",mainData.withoutDesc,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"desc\" is required")
        })
    })


    it("send request with body without date",()=>{
        cy.post("contest/uz",mainData.withoutDate,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"date\" is required")
        })
    })

    it("send request without lang",()=>{
        cy.post("contest",{},"",false)
        .then(res=>{
            expect(res.status).to.eq(404)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Route not found")
        })
    })

    it("send request with uz lang",()=>{
        cy.post("contest/uz",)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })


    it("send request with ru lang",()=>{
        cy.post("contest/ru",{},"",false)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })

    it("send request with en lang",()=>{
        cy.post("contest/en",{},"",false)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })

    it("send request with unsupported lang",()=>{
        cy.post("contest/de",{},"",false)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Lang is not supported")
        })
    })


})