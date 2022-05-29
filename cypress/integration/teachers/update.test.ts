import "../../support/commands"
import { TeacherDataProps } from "../../types/teachers"

describe("Teachers Update API tests",()=>{
    let mainData:TeacherDataProps
    let token:string
    let id:string
    let departmentId:string

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
                        cy.departmentCreate(res.token)
                            .then(depId=>{
                                departmentId = depId
                            })
                    })
            })


        cy.fixture("teachers/update")
        .then(data=>{
            mainData =data
        })

        
    })

    after(()=>{
        cy.task("removeUsers2")
            .then((res)=>{
                console.log(res);
            })

        cy.deleteRequest(`teacher/${id}/uz`,token)
    })

    it("create api working correctly or not",()=>{
        mainData.body.departmentId=departmentId
        cy.patch(`teacher/${id}/uz`,mainData.body,token)
        .then(res=>{
            expect(res.status).to.eq(200)
            expect(res.body.error).to.eq(false)
            expect(res.body.message).to.eq("Updated")
        })
    })


    it("send request with body without fullname",()=>{
        cy.patch(`teacher/${id}/uz`,mainData.withoutfullname,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"fullname\" is required")
        })
    })

    it("send request with body without education title",()=>{
        cy.patch(`teacher/${id}/uz`,mainData.withoutEducationTitle,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"educationTitle\" is required")
        })
    })

    it("send request with body without birthdate",()=>{
        cy.patch(`teacher/${id}/uz`,mainData.withoutBirthdate,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"birthdate\" is required")
        })
    })

    it("send request with body without passportSeries",()=>{
        cy.patch(`teacher/${id}/uz`,mainData.withoutPassportSeries,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"passportSeries\" is required")
        })
    })

    it("send request with body without passportNumber",()=>{
        cy.patch(`teacher/${id}/uz`,mainData.withoutPassportNumber,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"passportNumber\" is required")
        })
    })

    it("send request with body without email",()=>{
        cy.patch(`teacher/${id}/uz`,mainData.withoutEmail,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"email\" is required")
        })
    })

    it("send request with body without is_MA",()=>{
        cy.patch(`teacher/${id}/uz`,mainData.withoutISMA,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"is_MA\" is required")
        })
    })

    it("send request with body without study_foreign",()=>{
        cy.patch(`teacher/${id}/uz`,mainData.withoutStudyForeign,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"study_foreign\" is required")
        })
    })

    it("send request with body without dateOfEntry",()=>{
        mainData.withoutDateOfEntry.departmentId = departmentId
        cy.patch(`teacher/${id}/uz`,mainData.withoutDateOfEntry,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"dateOfEntry\" is required")
        })
    })

    it("send request with body without departmentId",()=>{
        
        cy.patch(`teacher/${id}/uz`,mainData.withoutDepartmentId,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"departmentId\" is required")
        })
    })



    it("send request with body without title",()=>{
        cy.patch(`teacher/${id}/uz`,mainData.withoutTitle,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"title\" is required")
        })
    })

    it("send request with body with wrong passport series",()=>{
        cy.patch(`teacher/${id}/uz`,mainData.withWrongPassportSeries,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"passportSeries\" length must be 2 characters long")
        })
    })

    it("send request with body with  with Wrong Education Title",()=>{
        cy.patch(`teacher/${id}/uz`,mainData.withWrongEducationTitle,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"educationTitle\" must be one of [Stajor_oqituvchi, oqituvchi, katta_oqituvchi, dotsent, professor, akademik]")
        })
    })

    it("send request with body with  with Wrong passport number",()=>{
        cy.patch(`teacher/${id}/uz`,mainData.withPassportNumberMoreThanSevenLength,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"passportNumber\" length must be 7 characters long")
        })
    })

    it("send request with body with  with Wrong passport number",()=>{
        cy.patch(`teacher/${id}/uz`,mainData.withPassportNumberLessThanSevenLength,token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"passportNumber\" length must be 7 characters long")
        })
    })

    it("send request with empty body",()=>{
        cy.patch(`teacher/${id}/uz`,{},token)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("\"fullname\" is required")
        })
    })

    it("send request without token",()=>{
        cy.patch(`teacher/${id}/uz`)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })


    it("send request without lang",()=>{
        cy.patch(`teacher/${id}`)
        .then(res=>{
            expect(res.status).to.eq(404)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Route not found")
        })
    })

    it("send request with uz lang",()=>{
        cy.patch(`teacher/${id}/uz`)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })


    it("send request with ru lang",()=>{
        cy.patch(`teacher/${id}/ru`)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })

    it("send request with en lang",()=>{
        cy.patch(`teacher/${id}/en`)
        .then(res=>{
            expect(res.status).to.eq(403)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("No token")
        })
    })

    it("send request with unsupported lang",()=>{
        cy.patch(`teacher/${id}/de`)
        .then(res=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.eq(true)
            expect(res.body.message).to.eq("Lang is not supported")
        })
    })
  


})