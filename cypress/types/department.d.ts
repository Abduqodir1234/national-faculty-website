export interface DepartmentDataProps{
    body:{
        name:string,
        dean?:string | null,
        desc:string,
        address:string
    },
    withoutName:{
        dean?:string | null,
        desc:string,
        address:string
    },
    withoutDesc:{
        name:string,
        dean:string | null,
        address:string
    },
    withoutAddress:{
        name:string,
        dean:string | null,
        desc:string,
    }
}