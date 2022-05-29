// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/// <reference types="cypress" />


interface RegisterProps{
    error:boolean;
    message:string
}

interface GetProps{
    error:boolean;
    message:string | null;
    data:any
}

declare namespace Cypress {
    interface Chainable<Subject> {
        register(token: string): Cypress.Chainable<Cypress.Response<RegisterProps>>;
        signIn(): Cypress.Chainable<{token:string}>;
        signIn2():  Cypress.Chainable<{token:string}>;
        getRequest(url: string,token?:string,failOnStatusCode?:boolean): Cypress.Chainable<Cypress.Response<any>>;
        deleteRequest(url: string,token?:string,failOnStatusCode?:boolean): Cypress.Chainable<Cypress.Response<any>>;
        post(url:string,body?:Cypress.RequestBody,token?:string,failOnStatusCode?:boolean ): Cypress.Chainable<Cypress.Response<any>>;
        patch(url:string,body?:Cypress.RequestBody,token?:string,failOnStatusCode?:boolean ): Cypress.Chainable<Cypress.Response<any>>;
        newsCreate(token: string): Cypress.Chainable<string>;
        subjectCreate(token: string): Cypress.Chainable<string>;
        majorCreate(token: string): Cypress.Chainable<string>;
        resourceCategoryCreate(token: string): Cypress.Chainable<string>;
        departmentCreate(token: string): Cypress.Chainable<string>;
        teacherCreate(token: string): Cypress.Chainable<string>;
    }
  }


Cypress.Commands.add("register",(token)=>{
    cy.fixture("user/register.json")
        .then(data=>{
            return cy.request({
                method:"POST",
                url:"/user/register/uz",
                headers:{
                    "Authorization":`Bearer ${token}`
                },
                body:data.body2,
                failOnStatusCode:false
            })
        })
})


Cypress.Commands.add("signIn",()=>{
    cy.fixture("user/login.json")
        .then(data=>{
            cy.request("POST","/user/login/uz",data.body)
            .then((res)=>{
                expect(res.status).to.eq(200)
                expect(res.body.error).to.eq(false)
                expect(res.body.data.token).exist
                return {token:res.body.data.token}
            })
        })
})

Cypress.Commands.add("signIn2",()=>{
    cy.fixture("user/login.json")
        .then(data=>{
            cy.request("POST","/user/login/uz",data.body2)
            .then((res)=>{
                expect(res.status).to.eq(200)
                expect(res.body.error).to.eq(false)
                expect(res.body.data.token).exist
                return {token:res.body.data.token}
            })
        })
})


Cypress.Commands.add("post",(url,body={},token="",failOnStatusCode=false)=>{
        return cy.request({
            method:"POST",
            url,
            body,
            headers:{
                "Authorization": `Bearer ${token}`,
            },
            failOnStatusCode
        })
})




Cypress.Commands.add("patch",(url,body={},token="",failOnStatusCode=false)=>{
    return cy.request({
        method:"PATCH",
        url,
        body,
        headers:{
            "Authorization": `Bearer ${token}`,
        },
        failOnStatusCode
    })
})


Cypress.Commands.add("getRequest",(url,token="",failOnStatusCode=false)=>{
    return cy.request({
        method:"GET",
        url,
        headers:{
            "Authorization": `Bearer ${token}`,
        },
        failOnStatusCode
    })
})

Cypress.Commands.add("deleteRequest",(url,token="",failOnStatusCode=false)=>{
    return cy.request({
        method:"DELETE",
        url,
        headers:{
            "Authorization": `Bearer ${token}`,
        },
        failOnStatusCode
    })
})


Cypress.Commands.add("newsCreate",(token)=>{
    cy.fixture("news/create")
    .then(data=>{
        cy.request({
            method:"POST",
            url:"news/uz",
            body:data.body,
            headers:{
                "Authorization": `Bearer ${token}`,
            },
            failOnStatusCode:false
        })
            .then(()=>{
                cy.getRequest(`/news/uz?title=${data.body.title}&short_desc=${data.body.short_desc}`)
                .then(res=>{
                    return res.body.data.data[0]._id
                })
            })
    })
    
})

Cypress.Commands.add('subjectCreate',(token:string)=>{
    cy.fixture("subject/create")
    .then(data=>{
        cy.request({
            method:"POST",
            url:"subject/uz",
            body:data.body,
            headers:{
                "Authorization": `Bearer ${token}`,
            },
            failOnStatusCode:false
        })
            .then(()=>{
                cy.getRequest(`/subject/uz?name=${data.body.name}`)
                .then(res=>{
                    return res.body.data.data[0]._id
                })
            })
    })
})

Cypress.Commands.add('majorCreate',(token:string)=>{
    cy.fixture("majors/create")
    .then(data=>{
        cy.request({
            method:"POST",
            url:"majors/uz",
            body:data.body,
            headers:{
                "Authorization": `Bearer ${token}`,
            },
            failOnStatusCode:false
        })
            .then(()=>{
                cy.getRequest(`/majors/uz?name=${data.body.name}`)
                .then(res=>{
                    return res.body.data.data[0]._id
                })
            })
    })
})


Cypress.Commands.add('resourceCategoryCreate',(token:string)=>{
    cy.fixture("resourceCategory/create")
    .then(data=>{
        cy.request({
            method:"POST",
            url:"resource/category/uz",
            body:data.body,
            headers:{
                "Authorization": `Bearer ${token}`,
            },
            failOnStatusCode:false
        })
            .then(()=>{
                cy.getRequest(`/resource/category/uz?name=${data.body.name}`)
                .then(res=>{
                    return res.body.data.data[0]._id
                })
            })
    })
})

Cypress.Commands.add('departmentCreate',(token:string)=>{
    cy.fixture("department/create")
    .then(data=>{
        cy.request({
            method:"POST",
            url:"department/uz",
            body:data.body,
            headers:{
                "Authorization": `Bearer ${token}`,
            },
            failOnStatusCode:false
        })
            .then(()=>{
                cy.getRequest(`/department/uz?name=${data.body.name}`)
                .then(res=>{
                    return res.body.data.data[0]._id
                })
            })
    })
})


Cypress.Commands.add('teacherCreate',(token:string)=>{
    cy.departmentCreate(token)
        .then(res=>{
            cy.fixture("teachers/create")
                .then(data=>{
                    data.body.departmentId = res
                    cy.request({
                        method:"POST",
                        url:"teacher/uz",
                        body:data.body,
                        headers:{
                            "Authorization": `Bearer ${token}`,
                        },
                        failOnStatusCode:false
                    })
                        .then(()=>{
                            cy.getRequest(`/teacher/uz?fullname=${data.body.fullname}`)
                            .then(res=>{
                                return res.body.data.data[0]._id
                            })
                        })
                })
        })
    
})




