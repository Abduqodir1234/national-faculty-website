import CoreTestService from "./CoreService";
import "../support/commands"
import { RequestMethodsTypes } from "../types/RequestMethods";



class BaseTestService extends CoreTestService{
    supportedLangs:string[] = Cypress.env("supportedLangs")
    unSupportedLangs:string[] = Cypress.env("unSupportedLangs")
    
    langCheckForSupportedLangsInCreate(url: string) {
        this.supportedLangs.forEach(one=>{
            this.langCheckInCreate(`${url}/${one}`)
        })  
    }

    langCheckForSupportedLangsInUpdate(url: string) {
        this.supportedLangs.forEach(one=>{
            this.langCheckInUpdateAndDelete("PATCH",`${url}/${one}`)
        })  
    }

    langCheckForSupportedLangsInDelete(url: string) {
        this.supportedLangs.forEach(one=>{
            this.langCheckInUpdateAndDelete("DELETE",`${url}/${one}`)
        })  
    }

    langCheckForSupportedLangsInList(url: string) {
        this.supportedLangs.forEach(one=>{
            this.langCheckInList(`${url}/${one}`)
        })  
    }

    langCheckForSupportedLangsInGetById(url: string) {
        this.supportedLangs.forEach(one=>{
            this.langCheckInGetById(`${url}/${one}`)
        })  
    }

    langCheckForSupportedLangsInGetByIdinTokenBasedAPI(url: string) {
        this.supportedLangs.forEach(one=>{
            this.langCheckInGetByIdInTokenBasedAPI(`${url}/${one}`)
        })  
    }

    langCheckForUnSupportedLangs(method:RequestMethodsTypes["methods"],url: string) {
        this.unSupportedLangs.forEach(one=>{
            this.langCheckForUnsupportedLangs(method,`${url}/${one}`)
        })  
    }

    testCreateSuccess(url:string,body:Cypress.RequestBody,token?:string){
        cy.request({
            method:"POST",
            url,
            body,
            headers:{
                "Authorization":`Bearer ${token}`
            },
            failOnStatusCode:false
        })
            .then(res=>{
                expect(res.status).to.eq(201)
                expect(res.body.error).to.eq(false)
                expect(res.body.message).to.eq("created")
            })
    }

    testCreateSuccessWithBlob(url:string,body:Cypress.RequestBody,token?:string){
        cy.request({
            method:"POST",
            url,
            body,
            headers:{
                "Authorization":`Bearer ${token}`
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

    testUpdateSuccessWithBlob(url:string,body:Cypress.RequestBody,token?:string){
        cy.request({
            method:"PATCH",
            url,
            body,
            headers:{
                "Authorization":`Bearer ${token}`
            },
            failOnStatusCode:false
        })
            .then(res=>{
                const resBody = JSON.parse(Cypress.Blob.arrayBufferToBinaryString(res.body))
                expect(res.status).to.eq(200)
                expect(resBody.error).to.eq(false)
                expect(resBody.message).to.eq("Updated")
            })
    }

    testUpdateSuccess(url:string,body:Cypress.RequestBody,token?:string){
        cy.request({
            method:"PATCH",
            url,
            body,
            headers:{
                "Authorization":`Bearer ${token}`
            },
            failOnStatusCode:false
        })
            .then(res=>{
                expect(res.status).to.eq(200)
                expect(res.body.error).to.eq(false)
                expect(res.body.message).to.eq("Updated")
            })
    }

    testDeleteSuccess(url:string,token?:string){
        cy.request({
            method:"DELETE",
            url,
            headers:{
                "Authorization":`Bearer ${token}`
            },
            failOnStatusCode:false
        })
            .then(res=>{
                expect(res.status).to.eq(200)
                expect(res.body.error).to.eq(false)
                expect(res.body.message).to.eq("Deleted")
            })
    }

    testGetByIdSuccess(url:string){
        cy.request({
            method:"GET",
            url,
            failOnStatusCode:false
        })
            .then(res=>{
                expect(res.status).to.eq(200)
                expect(res.body.error).to.eq(false)
                expect(res.body.data._id).exist
            })
    }

    testListSuccess(url:string){
        cy.request({
            method:"GET",
            url,
            failOnStatusCode:false
        })
            .then(res=>{
                expect(res.status).to.eq(200)
                expect(res.body.error).to.eq(false)
                expect(res.body.data.data).exist
                expect(res.body.data.data).length.least(1)
                expect(res.body.data.metadata.page).exist
                expect(res.body.data.metadata.limit).exist
                expect(res.body.data.metadata.total).exist
            })
    }

    testListQuerySearch(url:string){
        cy.request({
            method:"GET",
            url,
            failOnStatusCode:false
        })
            .then(res=>{
                expect(res.status).to.eq(200)
                expect(res.body.error).to.eq(false)
                expect(res.body.data.data).exist
                expect(res.body.data.data).to.have.length(1)
                expect(res.body.data.metadata.page).exist
                expect(res.body.data.metadata.limit).exist
                expect(res.body.data.metadata.total).exist
            })
    }

    testRequiredAttributes(
        method:RequestMethodsTypes["methods"],
        url:string,
        token:string,
        data:Cypress.RequestBody[],
        missedFieldNames:string[]
    ){
        data.forEach((one,ind)=>{
            it(`send request with body without ${missedFieldNames[ind]}`,()=>{
                this.testRequiredAttribute(method,`${url}/uz`,token,one,missedFieldNames[ind])
            })
        })
    }


    testWithNonExistId(method:RequestMethodsTypes["methods"],url:string,token?:string,body?:Cypress.RequestBody){
        cy.request({
            method,
            url:`${url}/123456789123456789123456/${this.supportedLangs[0]}`,
            body,
            headers:{
                Authorization:`Bearer ${token}`
            },
            failOnStatusCode:false
        })
            .then(res=>{
                expect(res.status).to.eq(404)
                expect(res.body.error).to.eq(true)
                expect(res.body.message).to.eq("Not found")
            })
    }

    testRequestWithNoToken(
        method:RequestMethodsTypes["methods"],
        url:string,
    ){
        cy.request({
            method,
            url,
            failOnStatusCode:false
        })
            .then(res=>{
                expect(res.status).to.eq(403)
                expect(res.body.error).to.eq(true)
                expect(res.body.message).to.eq("No token")
            })
    }





    
}

export default BaseTestService;