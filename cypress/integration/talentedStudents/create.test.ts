import DepartmentSubjectsCreateTestService from "../../IntegrationServices/departmentSubjects/create.service"
import TalentedStudentsCreateTestService from "../../IntegrationServices/talentedStudents/create.service"

describe("Talented Students Create API tests",()=>{
    const service = new TalentedStudentsCreateTestService()
    const supportedLangs:string[] = Cypress.env("supportedLangs")

    before(()=>{
        service.beforeAll()
    })

    after(()=>service.afterAll())




    it("language check for supported languages",()=>{
        service.langCheckForSupportedLangsInCreate(service.url)
    })

    it("send request without language in url",()=>{
        service.requestWithoutLangInUrl("POST",service.url)
    })

    it("language check for supported languages",()=>{
        service.langCheckForUnSupportedLangs("POST",service.url)
    })

    it("check create api working successfully",()=>{
        service.testCreate()
    })

    it("send request without fullname",()=>{
        service.testRequiredAttribute(
            "POST",
            `${service.url}/${supportedLangs[0]}`,
            service.token,
            service.mainData.withoutFullname,
            "fullname"
        )
    })

    it("send request without address",()=>{
        service.testRequiredAttribute(
            "POST",
            `${service.url}/${supportedLangs[0]}`,
            service.token,
            service.mainData.withoutAddress,
            "address"
        )
    })

    it("send request without birthdate",()=>{
        service.testRequiredAttribute(
            "POST",
            `${service.url}/${supportedLangs[0]}`,
            service.token,
            service.mainData.withoutBirthdate,
            "birthdate"
        )
    })


    it("send request without desc",()=>{
        service.testRequiredAttribute(
            "POST",
            `${service.url}/${supportedLangs[0]}`,
            service.token,
            service.mainData.withoutDesc,
            "desc"
        )
    })

    it("send request without majorId",()=>{
        service.testRequiredAttribute(
            "POST",
            `${service.url}/${supportedLangs[0]}`,
            service.token,
            service.mainData.withoutMajorId,
            "majorId"
        )
    })

    it("send request without specialization",()=>{
        service.testRequiredAttribute(
            "POST",
            `${service.url}/${supportedLangs[0]}`,
            service.token,
            service.mainData.withoutSpecialization,
            "specialization"
        )
    })

    it("send request without title",()=>{
        service.testRequiredAttribute(
            "POST",
            `${service.url}/${supportedLangs[0]}`,
            service.token,
            service.mainData.withoutTitle,
            "title"
        )
    })


 

    it("send request with body that includes wrong type of address",()=>{
        service.testRequiredAttributeType(
            "POST",
            `${service.url}/${supportedLangs[0]}`,
            service.token,
            service.mainData.withWrongTypeOfAddress,
            "address",
            "string"
        )
    })



    it("send request with body that includes wrong type of desc",()=>{
        service.testRequiredAttributeType(
            "POST",
            `${service.url}/${supportedLangs[0]}`,
            service.token,
            service.mainData.withWrongTypeOfDesc,
            "desc",
            "string"
        )
    })

    it("send request with body that includes wrong type of fullname",()=>{
        service.testRequiredAttributeType(
            "POST",
            `${service.url}/${supportedLangs[0]}`,
            service.token,
            service.mainData.withWrongTypeOfFullname,
            "fullname",
            "string"
        )
    })

    it("send request with body that includes wrong type of majorId",()=>{
        service.testRequiredAttributeType(
            "POST",
            `${service.url}/${supportedLangs[0]}`,
            service.token,
            service.mainData.withWrongTypeOfMajorId,
            "majorId",
            "string"
        )
    })

    it("send request with body that includes wrong type of specialization",()=>{
        service.testRequiredAttributeType(
            "POST",
            `${service.url}/${supportedLangs[0]}`,
            service.token,
            service.mainData.withWrongTypeOfSpecialization,
            "specialization",
            "string"
        )
    })


    it("send request with body that includes wrong type of title",()=>{
        service.testRequiredAttributeType(
            "POST",
            `${service.url}/${supportedLangs[0]}`,
            service.token,
            service.mainData.withWrongTypeOfTitle,
            "title",
            "string"
        )
    })




    it("send request with body that includes future date for birthdate",()=>{
        service.testRequiredAttributeInCustomValidation(
            "POST",
            `${service.url}/${supportedLangs[0]}`,
            service.token,
            service.mainData.withFutureBirthdate,
            "\"birthdate\" must be less than \"now\"",
        )
    })

    it("send request with body that includes wrong type of birthdate",()=>{
        service.testRequiredAttributeInCustomValidation(
            "POST",
            `${service.url}/${supportedLangs[0]}`,
            service.token,
            service.mainData.withWrongTypeOfBirthdate,
            "\"birthdate\" must be less than \"now\""
        )
    })


    it("send request with body that includes unexist majorId",()=>{
        service.testRequiredAttributeInCustomValidation(
            "POST",
            `${service.url}/${supportedLangs[0]}`,
            service.token,
            service.mainData.withUnexistMajorId,
            "Major not exist",
        )
    })




})