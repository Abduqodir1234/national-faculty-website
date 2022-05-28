///<reference types="cypress"/>
import "../../support/commands"
import { MainInfosDataProps } from "../../types/mainInfos"


describe("Main Infos Create API tests",()=>{
    let token=""
    let mainData:MainInfosDataProps

    before(()=>{
        cy.signIn()
        .then((res)=>{
            cy.register(res.token)
            cy.signIn2()
                .then(res=>{
                    token = res.token
                })
        })

        cy.fixture("mainInfos/create")
            .then(data=>{
                mainData = data
            })
    })

    after(()=>{
        cy.task("removeUsers2")
        .then((res)=>{
            console.log(res);
        })
    })


    it("request without token",()=>{
        cy.post("/main/infos/uz")
            .then(res=>{
                expect(res.status).to.eq(403)
                expect(res.body.error).to.eq(true)
                expect(res.body.message).to.eq("No token")
            })
    })

    it("request with empty body",()=>{
        cy.post("/main/infos/uz",{},token)
            .then(res=>{
                expect(res.status).to.eq(400)
                expect(res.body.error).to.eq(true)
                expect(res.body.message).to.eq("\"email\" is required")
            })
    })
    

    it("create only one data",()=>{
        cy.post("/main/infos/uz",mainData.body,token)
            .then(res=>{
                expect(res.status).to.eq(400)
                expect(res.body.error).to.eq(true)
                expect(res.body.message).to.eq("Data exists")
            })
    })

    it("send request with body without email",()=>{
        cy.post("/main/infos/uz",mainData.withoutEmail,token)
            .then(res=>{
                expect(res.status).to.eq(400)
                expect(res.body.error).to.eq(true)
                expect(res.body.message).to.eq("\"email\" is required")
            })
    })

    it("send request with body without phoneNumber",()=>{
        cy.post("/main/infos/uz",mainData.withoutPhoneNumber,token)
            .then(res=>{
                expect(res.status).to.eq(400)
                expect(res.body.error).to.eq(true)
                expect(res.body.message).to.eq("\"phoneNumber\" is required")
            })
    })


    it("send request with body without address",()=>{
        cy.post("/main/infos/uz",mainData.withoutAddress,token)
            .then(res=>{
                expect(res.status).to.eq(400)
                expect(res.body.error).to.eq(true)
                expect(res.body.message).to.eq("\"address\" is required")
            })
    })

    it("send request with body without coordinate x",()=>{
        cy.post("/main/infos/uz",mainData.withoutCoordinateX,token)
            .then(res=>{
                expect(res.status).to.eq(400)
                expect(res.body.error).to.eq(true)
                expect(res.body.message).to.eq("Data exists")
            })
    })


    it("send request with body without coordinate Y",()=>{
        cy.post("/main/infos/uz",mainData.withoutCoordinateY,token)
            .then(res=>{
                expect(res.status).to.eq(400)
                expect(res.body.error).to.eq(true)
                expect(res.body.message).to.eq("Data exists")
            })
    })

    it("send request with body without facebook",()=>{
        cy.post("/main/infos/uz",mainData.withoutFacebook,token)
            .then(res=>{
                expect(res.status).to.eq(400)
                expect(res.body.error).to.eq(true)
                expect(res.body.message).to.eq("Data exists")
            })
    })


    it("send request with body without instagram",()=>{
        cy.post("/main/infos/uz",mainData.withoutInstagram,token)
            .then(res=>{
                expect(res.status).to.eq(400)
                expect(res.body.error).to.eq(true)
                expect(res.body.message).to.eq("Data exists")
            })
    })

    it("send request with body without telegram",()=>{
        cy.post("/main/infos/uz",mainData.withoutTelegram,token)
            .then(res=>{
                expect(res.status).to.eq(400)
                expect(res.body.error).to.eq(true)
                expect(res.body.message).to.eq("Data exists")
            })
    })


    it("send request with body without youtube",()=>{
        cy.post("/main/infos/uz",mainData.withoutYoutube,token)
            .then(res=>{
                expect(res.status).to.eq(400)
                expect(res.body.error).to.eq(true)
                expect(res.body.message).to.eq("Data exists")
            })
    })


    it("send request with body without startWork",()=>{
        cy.post("/main/infos/uz",mainData.withoutStartWork,token)
            .then(res=>{
                expect(res.status).to.eq(400)
                expect(res.body.error).to.eq(true)
                expect(res.body.message).to.eq("\"startWork\" is required")
            })
    })


    it("send request with body without endWork",()=>{
        cy.post("/main/infos/uz",mainData.withoutEndWork,token)
            .then(res=>{
                expect(res.status).to.eq(400)
                expect(res.body.error).to.eq(true)
                expect(res.body.message).to.eq("\"endWork\" is required")
            })
    })


    it("send request without lang",()=>{
        cy.post("main/infos",{},"",false)
        .then(res=>{
            expect(res.status).to.eq(404)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Route not found")
        })
    })

    it("send request with uz lang",()=>{
        cy.post("main/infos/uz",)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })


    it("send request with ru lang",()=>{
        cy.post("main/infos/ru",{},"",false)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })

    it("send request with en lang",()=>{
        cy.post("main/infos/en",{},"",false)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })

    it("send request with unsupported lang",()=>{
        cy.post("main/infos/de",{},"",false)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Lang is not supported")
        })
    })



})