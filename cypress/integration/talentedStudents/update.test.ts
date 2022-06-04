import DepartmentSubjectMainTestService from "../../IntegrationServices/departmentSubjects/main.service"
import TalentedStudentsMainTestService from "../../IntegrationServices/talentedStudents/main.service"

describe("Department Subjects Update API tests",()=>{
    const service = new TalentedStudentsMainTestService()

    before(()=>{
        service.beforeAll()
            .then(()=>{
                cy.talentedStudentsCreate(service.token,service.majorId,service.photo)
                .then(talentedStudentsId=>{
                    service.id = talentedStudentsId
                    
                })
            })
        
    })

    after(()=>{
        service.afterAll()
            .then(()=>null)
    })

    it("language check for supported languages",()=>{
        service.langCheckForSupportedLangsInUpdate(`${service.url}/${service.id}`)
    })

    it("send request without language in url",()=>{
        service.requestWithoutLangInUrl("PATCH",`${service.url}/${service.id}`)
    })

    it("language check for supported languages",()=>{
        service.langCheckForUnSupportedLangs("PATCH",`${service.url}/${service.id}`)
    })

    it("check create api working successfully",()=>{
        service.mainData.body.majorId = service.majorId
        service.testUpdateSuccess( 
            `${service.url}/${service.id}/${service.supportedLangs[0]}`,
            service.mainData.body,
            service.token
        )
    })

    it("send request without fullname",()=>{
        service.testRequiredAttribute(
            "PATCH",
            `${service.url}/${service.id}/${service.supportedLangs[0]}`,
            service.token,
            service.mainData.withoutFullname,
            "fullname"
        )
    })

    it("send request without address",()=>{
        service.testRequiredAttribute(
            "PATCH",
            `${service.url}/${service.id}/${service.supportedLangs[0]}`,
            service.token,
            service.mainData.withoutAddress,
            "address"
        )
    })

    it("send request without birthdate",()=>{
        service.testRequiredAttribute(
            "PATCH",
            `${service.url}/${service.id}/${service.supportedLangs[0]}`,
            service.token,
            service.mainData.withoutBirthdate,
            "birthdate"
        )
    })


    it("send request without desc",()=>{
        service.testRequiredAttribute(
            "PATCH",
            `${service.url}/${service.id}/${service.supportedLangs[0]}`,
            service.token,
            service.mainData.withoutDesc,
            "desc"
        )
    })

    it("send request without majorId",()=>{
        service.testRequiredAttribute(
            "PATCH",
            `${service.url}/${service.id}/${service.supportedLangs[0]}`,
            service.token,
            service.mainData.withoutMajorId,
            "majorId"
        )
    })

    it("send request without specialization",()=>{
        service.testRequiredAttribute(
            "PATCH",
            `${service.url}/${service.id}/${service.supportedLangs[0]}`,
            service.token,
            service.mainData.withoutSpecialization,
            "specialization"
        )
    })

    it("send request without title",()=>{
        service.testRequiredAttribute(
            "PATCH",
            `${service.url}/${service.id}/${service.supportedLangs[0]}`,
            service.token,
            service.mainData.withoutTitle,
            "title"
        )
    })


 

    it("send request with body that includes wrong type of address",()=>{
        service.testRequiredAttributeType(
            "PATCH",
            `${service.url}/${service.id}/${service.supportedLangs[0]}`,
            service.token,
            service.mainData.withWrongTypeOfAddress,
            "address",
            "string"
        )
    })



    it("send request with body that includes wrong type of desc",()=>{
        service.testRequiredAttributeType(
            "PATCH",
            `${service.url}/${service.id}/${service.supportedLangs[0]}`,
            service.token,
            service.mainData.withWrongTypeOfDesc,
            "desc",
            "string"
        )
    })

    it("send request with body that includes wrong type of fullname",()=>{
        service.testRequiredAttributeType(
            "PATCH",
            `${service.url}/${service.id}/${service.supportedLangs[0]}`,
            service.token,
            service.mainData.withWrongTypeOfFullname,
            "fullname",
            "string"
        )
    })

    it("send request with body that includes wrong type of majorId",()=>{
        service.testRequiredAttributeType(
            "PATCH",
            `${service.url}/${service.id}/${service.supportedLangs[0]}`,
            service.token,
            service.mainData.withWrongTypeOfMajorId,
            "majorId",
            "string"
        )
    })

    it("send request with body that includes wrong type of specialization",()=>{
        service.testRequiredAttributeType(
            "PATCH",
            `${service.url}/${service.id}/${service.supportedLangs[0]}`,
            service.token,
            service.mainData.withWrongTypeOfSpecialization,
            "specialization",
            "string"
        )
    })


    it("send request with body that includes wrong type of title",()=>{
        service.testRequiredAttributeType(
            "PATCH",
            `${service.url}/${service.id}/${service.supportedLangs[0]}`,
            service.token,
            service.mainData.withWrongTypeOfTitle,
            "title",
            "string"
        )
    })




    it("send request with body that includes future date for birthdate",()=>{
        service.testRequiredAttributeInCustomValidation(
            "PATCH",
            `${service.url}/${service.id}/${service.supportedLangs[0]}`,
            service.token,
            service.mainData.withFutureBirthdate,
            "\"birthdate\" must be less than \"now\"",
        )
    })

    it("send request with body that includes wrong type of birthdate",()=>{
        service.testRequiredAttributeInCustomValidation(
            "PATCH",
            `${service.url}/${service.id}/${service.supportedLangs[0]}`,
            service.token,
            service.mainData.withWrongTypeOfBirthdate,
            "\"birthdate\" must be less than \"now\""
        )
    })


    it("send request with body that includes unexist majorId",()=>{
        service.testRequiredAttributeInCustomValidation(
            "PATCH",
            `${service.url}/${service.id}/${service.supportedLangs[0]}`,
            service.token,
            service.mainData.withUnexistMajorId,
            "Major not exist",
        )
    })

})