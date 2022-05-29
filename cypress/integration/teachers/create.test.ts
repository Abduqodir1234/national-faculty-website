import { TeacherDataProps } from "../../types/teachers"
import "../../support/commands"

describe("Teacher Delete API tests",()=>{
    let token=""
    let mainData:TeacherDataProps
    let departmentId:string

    before(()=>{
        cy.signIn()
        .then((res)=>{
            cy.register(res.token)
            cy.signIn2()
                .then(res=>{
                    token = res.token
                    cy.departmentCreate(res.token)
                        .then(depId=>{
                            departmentId = depId
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

        cy.getRequest(`/teacher/uz?fullname=${mainData.body.fullname}`)
            .then(res=>{
                console.log(res);
                
                res?.body?.data?.data?.forEach((one:{_id:string})=>{
                    cy.deleteRequest(`/teacher/${one._id}/uz`,token)
                })
            })
    })


    it("create api working correctly or not",()=>{
        mainData.body.departmentId=departmentId
        cy.post("/teacher/uz",mainData.body,token)
        .then(res=>{
            expect(res.status).to.eq(201)
            expect(res.body.error).to.eq(false)
            expect(res.body.message).to.eq("created")
        })
    })


    it("send request with body without fullname",()=>{
        cy.post("/teacher/uz",mainData.withoutfullname,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"fullname\" is required")
        })
    })

    it("send request with body without education title",()=>{
        cy.post("/teacher/uz",mainData.withoutEducationTitle,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"educationTitle\" is required")
        })
    })

    it("send request with body without birthdate",()=>{
        cy.post("/teacher/uz",mainData.withoutBirthdate,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"birthdate\" is required")
        })
    })

    it("send request with body without passportSeries",()=>{
        cy.post("/teacher/uz",mainData.withoutPassportSeries,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"passportSeries\" is required")
        })
    })

    it("send request with body without passportNumber",()=>{
        cy.post("/teacher/uz",mainData.withoutPassportNumber,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"passportNumber\" is required")
        })
    })

    it("send request with body without email",()=>{
        cy.post("/teacher/uz",mainData.withoutEmail,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"email\" is required")
        })
    })

    it("send request with body without is_MA",()=>{
        cy.post("/teacher/uz",mainData.withoutISMA,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"is_MA\" is required")
        })
    })

    it("send request with body without study_foreign",()=>{
        cy.post("/teacher/uz",mainData.withoutStudyForeign,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"study_foreign\" is required")
        })
    })

    it("send request with body without dateOfEntry",()=>{
        mainData.withoutDateOfEntry.departmentId = departmentId
        cy.post("/teacher/uz",mainData.withoutDateOfEntry,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"dateOfEntry\" is required")
        })
    })

    it("send request with body without departmentId",()=>{
        
        cy.post("/teacher/uz",mainData.withoutDepartmentId,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"departmentId\" is required")
        })
    })



    it("send request with body without title",()=>{
        cy.post("/teacher/uz",mainData.withoutTitle,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"title\" is required")
        })
    })

    it("send request with body with wrong passport series",()=>{
        cy.post("/teacher/uz",mainData.withWrongPassportSeries,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"passportSeries\" length must be 2 characters long")
        })
    })

    it("send request with body with  with Wrong Education Title",()=>{
        cy.post("/teacher/uz",mainData.withWrongEducationTitle,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"educationTitle\" must be one of [Stajor_oqituvchi, oqituvchi, katta_oqituvchi, dotsent, professor, akademik]")
        })
    })

    it("send request with body with  with Wrong passport number",()=>{
        cy.post("/teacher/uz",mainData.withPassportNumberMoreThanSevenLength,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"passportNumber\" length must be 7 characters long")
        })
    })

    it("send request with body with  with Wrong passport number",()=>{
        cy.post("/teacher/uz",mainData.withPassportNumberLessThanSevenLength,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"passportNumber\" length must be 7 characters long")
        })
    })

    it("send request with empty body",()=>{
        cy.post("teacher/uz",{},token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"fullname\" is required")
        })
    })

    it("send request without token",()=>{
        cy.post("teacher/uz")
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })


    it("send request without lang",()=>{
        cy.post("teacher")
        .then(res=>{
            expect(res.status).to.eq(404)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Route not found")
        })
    })

    it("send request with uz lang",()=>{
        cy.post("teacher/uz",)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })


    it("send request with ru lang",()=>{
        cy.post("teacher/ru")
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })

    it("send request with en lang",()=>{
        cy.post("teacher/en")
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })

    it("send request with unsupported lang",()=>{
        cy.post("teacher/de")
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Lang is not supported")
        })
    })
})