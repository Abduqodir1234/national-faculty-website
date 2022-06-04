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

/*
    Cypress Commands types
*/

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
        imageReturner():Cypress.Chainable<File>;
        contestCreate(token: string): Cypress.Chainable<string>;
        resourcesCreate(token: string,categoryId:string): Cypress.Chainable<string>;
        teacherCreate2(token: string,departmentId:string): Cypress.Chainable<string>;
        adminstrationCreate(token: string,departmentId:string,teacherId:string): Cypress.Chainable<string>;
        departmentMajorsCreate(token: string,departmentId:string,majorId:string): Cypress.Chainable<string>;
        departmentSubjectCreate(token: string,departmentId:string,subjectId:string): Cypress.Chainable<string>;
        talentedStudentsCreate(token:string,majorId:string,photo:File): Cypress.Chainable<string>;
    }
  }



/*
  This is for registering user
*/
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



/*
  This is for signIn user
*/

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


/*
  This is for signIn user 
  with different email and password
*/

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

/**
 * This command helps to send post request
*/
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

/**
 * This command helps to send patch request
*/
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


/**
 * This command helps to send get request
*/
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


/**
 * This command helps to send delete request
*/

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

/**
 * This command helps to create news
*/
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


/**
 * This command helps to create subject
*/
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

/**
 * This command helps to create major
*/
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

/**
 * This command helps to create resource category
*/
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


/**
 * This command helps to create department
*/
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


/**
 * This command helps to load 
 * image as File form not text
*/
Cypress.Commands.add("imageReturner",()=>{
    cy.fixture("images/user.jpeg")
        .then(imgTxt=>{
            const blob = Cypress.Blob.base64StringToBlob(imgTxt)
            const file = new File([blob],"blog.jpeg")
            return file;
        })
})

/**
 * This command helps to create teacher
 */
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


/**
 * This command helps to create contest
 */
Cypress.Commands.add('contestCreate',(token:string)=>{
           cy.imageReturner()
            .then(img=>{
                cy.fixture("contest/create")
                .then(data=>{
                    const {title,desc,date} = data.body
                    const formData = new FormData()
                    formData.append("title",title)
                    formData.append("desc",desc)
                    formData.append("date",date)
                    formData.append("img",img)

                    cy.request({
                        method:"POST",
                        url:"contest/uz",
                        body:formData,
                        headers:{
                            "Authorization": `Bearer ${token}`,
                        },
                        failOnStatusCode:false
                    })
                        .then(()=>{
                            cy.getRequest(`/contest/uz?title=${data.body.title}`)
                            .then(res=>{
                                return res.body.data.data[0]._id
                            })
                        })
            })
        })
    })


/**
 * This command helps to create resources
*/
Cypress.Commands.add('resourcesCreate',(token:string,categoryId:string)=>{
            cy.fixture("resources/create")
                .then(data=>{
                    data.body.categoryId = categoryId
                    cy.request({
                        method:"POST",
                        url:"resources/uz",
                        body:data.body,
                        headers:{
                            "Authorization": `Bearer ${token}`,
                        },
                        failOnStatusCode:false
                    })
                        .then(()=>{
                            cy.getRequest(`/resources/uz?title=${data.body.title}`)
                            .then(res=>{
                                return res.body.data.data[0]._id
                            })
                        })
                })
    
})

/**
 * This command helps to create teacher 
 * with given departmentId
 */
Cypress.Commands.add('teacherCreate2',(token:string,departmentId:string)=>{
            cy.fixture("teachers/create")
                .then(data=>{
                    data.body.departmentId = departmentId
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

/**
 * This command helps to create adminstration 
 * with given departmentId and teacherId
 */
Cypress.Commands.add('adminstrationCreate',(token:string,departmentId:string,teacherId:string)=>{
    cy.fixture("adminstration/create")
        .then(data=>{
            data.body.departmentId = departmentId
            data.body.teacherId = teacherId
            cy.request({
                method:"POST",
                url:"adminstration/uz",
                body:data.body,
                headers:{
                    "Authorization": `Bearer ${token}`,
                },
                failOnStatusCode:false
            })
                .then(()=>{
                    cy.getRequest(`/adminstration/uz?teacherId=${data.body.teacherId}&departmentId=${data.body.departmentId}`)
                    .then(res=>{
                        return res.body.data.data[0]._id
                    })
                })
        })
})


/**
 * This command helps to create department majors 
 * with given departmentId and majorId
 */
 Cypress.Commands.add('departmentMajorsCreate',(token:string,departmentId:string,majorId:string)=>{
    cy.fixture("departmentMajors/create")
        .then(data=>{
            data.body.departmentId = departmentId
            data.body.majorId = majorId
            cy.request({
                method:"POST",
                url:"department/majors/uz",
                body:data.body,
                headers:{
                    "Authorization": `Bearer ${token}`,
                },
                failOnStatusCode:false
            })
                .then(()=>{
                    cy.getRequest(`/department/majors/uz?majorId=${majorId}&departmentId=${departmentId}`)
                    .then(res=>{
                        return res.body.data.data[0]._id
                    })
                })
        })
})


/**
 * This command helps to create department subjects 
 * with given departmentId and subjectid
 */
 Cypress.Commands.add('departmentSubjectCreate',(token:string,departmentId:string,subjectId:string)=>{
    cy.fixture("departmentSubject/create")
        .then(data=>{
            data.body.departmentId = departmentId
            data.body.subjectId = subjectId
            cy.request({
                method:"POST",
                url:"department/subject/uz",
                body:data.body,
                headers:{
                    "Authorization": `Bearer ${token}`,
                },
                failOnStatusCode:false
            })
                .then(()=>{
                    cy.getRequest(`/department/subject/uz?subjectId=${subjectId}&departmentId=${departmentId}`)
                    .then(res=>{
                        return res.body.data.data[0]._id
                    })
                })
        })
})

/**
 * This command helps to create talented students 
 * with given majorId
 */
 Cypress.Commands.add('talentedStudentsCreate',(token:string,majorId:string,photo:File)=>{
    cy.fixture("talentedStudents/create")
        .then(data=>{
            const {
                address,birthdate,title,
                desc,fullname,specialization,
            }= data.body
            const formData = new FormData()
            formData.append("fullname",fullname)
            formData.append("address",address)
            formData.append("birthdate",birthdate)
            formData.append("title",title)
            formData.append("desc",desc)
            formData.append("majorId",majorId)
            formData.append("specialization",specialization)
            formData.append('img',photo)
            cy.request({
                method:"POST",
                url:"/students/talented/uz",
                body:formData,
                headers:{
                    "Authorization": `Bearer ${token}`,
                },
                failOnStatusCode:false
            })
                .then(()=>{
                    cy.getRequest(`/students/talented/uz?majorId=${majorId}&fullname=${data.body.fullname}`)
                    .then(res=>{
                       return res.body.data.data[0]._id
                    })
                })
        })
})