import { RequestMethodsTypes } from "../types/RequestMethods"

class CoreTestService{

    langCheckInGetById(url:string){
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

    langCheckInGetByIdInTokenBasedAPI(url:string){
        cy.request({
            method:"GET",
            url,
            failOnStatusCode:false
        })
            .then(res=>{
                expect(res.status).to.eq(403)
                expect(res.body.error).to.eq(true)
                expect(res.body.message).to.eq("No token")
            })
    }

    langCheckInList(url:string){
        cy.request({
            method:"GET",
            url,
            failOnStatusCode:false
        })
            .then(res=>{
                expect(res.status).to.eq(200)
                expect(res.body.error).to.eq(false)
                expect(res.body.data.data).exist
                expect(res.body.data.metadata.limit).exist
                expect(res.body.data.metadata.page).exist
                expect(res.body.data.metadata.total).exist
            })
    }

    langCheckInUpdateAndDelete(method:RequestMethodsTypes["methods"],url:string){
        cy.request({
            method,
            url:url,
            failOnStatusCode:false
        })
            .then(res=>{
                expect(res.status).to.eq(403)
                expect(res.body.error).to.eq(true)
                expect(res.body.message).to.eq("No token")
            })
    }

    langCheckInCreate(url:string){
        cy.request({
            method:"POST",
            url:url,
            failOnStatusCode:false
        })
            .then(res=>{
                expect(res.status).to.eq(403)
                expect(res.body.error).to.eq(true)
                expect(res.body.message).to.eq("No token")
            })
    }


    langCheckForUnsupportedLangs(method:RequestMethodsTypes["methods"],url:string){
        cy.request({
            method,
            url,
            failOnStatusCode:false
        })
            .then(res=>{
                expect(res.status).to.eq(400)
                expect(res.body.message).to.eq("Lang is not supported")
                expect(res.body.error).to.eq(true)
            })
    }

    

    requestWithoutLangInUrl(method:RequestMethodsTypes["methods"],url:string){
        cy.request({
            method,
            url,
            failOnStatusCode:false
        })
            .then(res=>{
                expect(res.status).to.eq(404)
                expect(res.body.message).to.eq("Route not found")
                expect(res.body.error).to.eq(true)
            })
    }


    requestWithoutLangInUrlInSomeExceptions(method:RequestMethodsTypes["methods"],url:string){
        cy.request({
            method,
            url,
            failOnStatusCode:false
        })
            .then(res=>{
                expect(res.status).to.eq(400)
                expect(res.body.message).to.eq("Lang is not supported")
                expect(res.body.error).to.eq(true)
            })
    }


    testRequiredAttribute(
        method:RequestMethodsTypes["methods"],
        url:string,
        token:string,
        data:Cypress.RequestBody,
        missedFieldName:string,
        
    ){
        cy.request({
            method,
            url,
            body:data,
            headers:{
                "Authorization":`Bearer ${token}`
            },
            failOnStatusCode:false
        })
            .then(res=>{
                expect(res.status).to.eq(400)
                expect(res.body.error).to.eq(true)
                expect(res.body.message).to.eq(`"${missedFieldName}" is required`)
            })
    }

    testRequiredAttributeType(
        method:RequestMethodsTypes["methods"],
        url:string,
        token:string,
        data:Cypress.RequestBody,
        fieldName:string,
        fieldType:string,
        
    ){
        cy.request({
            method,
            url,
            body:data,
            headers:{
                "Authorization":`Bearer ${token}`
            },
            failOnStatusCode:false
        })
            .then(res=>{
                expect(res.status).to.eq(400)
                expect(res.body.error).to.eq(true)
                expect(res.body.message).to.eq(`"${fieldName}" must be a ${fieldType}`)
            })
    }



    testRequiredAttributeInCustomValidation(
        method:RequestMethodsTypes["methods"],
        url:string,
        token:string,
        data:Cypress.RequestBody,
        message:string
        
    ){
        cy.request({
            method,
            url,
            body:data,
            headers:{
                "Authorization":`Bearer ${token}`
            },
            failOnStatusCode:false
        })
            .then(res=>{
                expect(res.status).to.eq(400)
                expect(res.body.error).to.eq(true)
                expect(res.body.message).to.eq(message)
            })
    }

    testingAccordingCustomValidation(
        method:RequestMethodsTypes["methods"],
        url:string,
        token:string,
        data:Cypress.RequestBody,
        message:string
    ){
        cy.request({
            method,
            url,
            body:data,
            headers:{
                "Authorization":`Bearer ${token}`
            },
            failOnStatusCode:false
        })
            .then(res=>{
                expect(res.status).to.eq(400)
                expect(res.body.error).to.eq(true)
                expect(res.body.message).to.eq(message)
            })
    }



}

export default CoreTestService;