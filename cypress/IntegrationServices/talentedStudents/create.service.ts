import { TalentedStudentsDataTypes } from "../../types/talentedStudents";
import BaseTestService from "../BaseService";



class TalentedStudentsCreateTestService extends BaseTestService{
    url = "/students/talented"
    majorId:string=""
    token:string=""
    mainData!: TalentedStudentsDataTypes;
    photo!:File

    beforeAll() {
        cy.fixture("talentedStudents/create")
            .then(data=>{
                this.mainData = data
            })


        cy.signIn()
            .then(res=>{
                this.token = res.token
                cy.majorCreate(res.token)
                    .then(majorId=>{
                        this.majorId = majorId
                    })
            })
        cy.imageReturner()
            .then(img=>{
                this.photo = img
            })
    }


    afterAll(){
     
        cy.deleteRequest(`majors/${this.majorId}/uz`,this.token)
        cy.getRequest(`${this.url}/${this.supportedLangs[0]}?majorId=${this.majorId}&fullname=${this.mainData.body.fullname}`)
            .then(res=>{
                cy.deleteRequest(`${this.url}/${res.body.data.data[0]._id}/uz`,this.token)
            })
    }


    testCreate(){
        const {
            address,birthdate,title,
            desc,fullname,majorId,specialization,
             }= this.mainData.body
        const formData = new FormData()
        formData.append("fullname",fullname)
        formData.append("address",address)
        formData.append("birthdate",birthdate)
        formData.append("title",title)
        formData.append("desc",desc)
        formData.append("majorId",this.majorId)
        formData.append("specialization",specialization)
        formData.append('img',this.photo)

        cy.request({
            method:"POST",
            url:`${this.url}/${this.supportedLangs[0]}`,
            body:formData,
            headers:{
                "Authorization":`Bearer ${this.token}`
            },
            failOnStatusCode:false
        })
            .then(res=>{
                const resBody = JSON.parse(Cypress.Blob.arrayBufferToBinaryString(res.body))
                expect(res.status).to.eq(201)
                expect(resBody.error).to.eq(false)
                expect(resBody.message).to.eq("created")
            })
    }

    


}

export default TalentedStudentsCreateTestService;