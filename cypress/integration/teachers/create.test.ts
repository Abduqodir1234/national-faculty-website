import TeachersMainTestService from "../../IntegrationServices/teachers/main.service"

describe("Teacher Delete API tests",()=>{
    const service = new TeachersMainTestService()
    let url = `${service.url}/${service.supportedLangs[0]}`

    before(()=>{
        service.beforeAll()
    })

    after(()=>service.afterAll())
   
    it("create api working correctly or not",()=>{
        service.mainData.body.departmentId=service.departmentId
        service.testCreateSuccess(
            url,
            service.mainData.body,
            service.token
        )
    })


    it("send request with body without fullname",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            service.token,
            service.mainData.withoutfullname,
            "fullname"
        )
    })

    it("send request with body without education title",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            service.token,
            service.mainData.withoutEducationTitle,
            "educationTitle"
        )
    })

    it("send request with body without birthdate",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            service.token,
            service.mainData.withoutBirthdate,
            "birthdate"
        )
    })

    it("send request with body without passportSeries",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            service.token,
            service.mainData.withoutPassportSeries,
            "passportSeries"
        )
    })

    it("send request with body without passportNumber",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            service.token,
            service.mainData.withoutPassportNumber,
            "passportNumber"
        )
    })

    it("send request with body without email",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            service.token,
            service.mainData.withoutEmail,
            "email"
        )
    })

    it("send request with body without is_MA",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            service.token,
            service.mainData.withoutISMA,
            "is_MA"
        )
      
    })

    it("send request with body without study_foreign",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            service.token,
            service.mainData.withoutStudyForeign,
            "study_foreign"
        )
    })

    it("send request with body without dateOfEntry",()=>{
        service.mainData.withoutDateOfEntry.departmentId = service.departmentId
        service.testRequiredAttribute(
            "POST",
            url,
            service.token,
            service.mainData.withoutDateOfEntry,
            "dateOfEntry"
        )
    })

    it("send request with body without departmentId",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            service.token,
            service.mainData.withoutDepartmentId,
            "departmentId"
        )
    })



    it("send request with body without title",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            service.token,
            service.mainData.withoutTitle,
            "title"
        )
    })

    it("send request with body with wrong passport series",()=>{
        service.testingAccordingCustomValidation(
            "POST",
            url,
            service.token,
            service.mainData.withWrongPassportSeries,
            "\"passportSeries\" length must be 2 characters long"
        )
    })

    it("send request with body with  with Wrong Education Title",()=>{
        service.testingAccordingCustomValidation(
            "POST",
            url,
            service.token,
            service.mainData.withWrongEducationTitle,
            "\"educationTitle\" must be one of [Stajor_oqituvchi, oqituvchi, katta_oqituvchi, dotsent, professor, akademik]"
        )
    })

    it("send request with body with  with Wrong passport number",()=>{
        service.testingAccordingCustomValidation(
            "POST",
            url,
            service.token,
            service.mainData.withPassportNumberMoreThanSevenLength,
            "\"passportNumber\" length must be 7 characters long"
        )
    })

    it("send request with body with  with Wrong passport number",()=>{
        service.testingAccordingCustomValidation(
            "POST",
            url,
            service.token,
            service.mainData.withPassportNumberLessThanSevenLength,
            "\"passportNumber\" length must be 7 characters long"
        )
    })

    it("send request with empty body",()=>{
        service.testRequiredAttribute(
            "POST",
            url,
            service.token,
            {},
            "fullname"
        )
    })

    it("send request without token",()=>{
        service.testRequestWithNoToken(
            "POST",
            url
        )
    })

    it("language check for supported languages",()=>{
        service.langCheckForSupportedLangsInCreate(service.url)
    })

    it("send request without language in url",()=>{
        service.langCheckForUnSupportedLangs("POST",service.url)
    })

    it("language check for supported languages",()=>{
        service.langCheckForUnSupportedLangs("POST",service.url)
    })
})