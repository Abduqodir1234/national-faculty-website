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
    },
    withWrongTypeOfName:{
        name:number,
        dean?:string | null,
        desc:string,
        address:string
    },
    withWrongTypeOfDesc:{
        name:string,
        dean?:string | null,
        desc:number,
        address:string
    },
    withWrongTypeOfAddress:{
        name:string,
        dean?:string | null,
        desc:string,
        address:number
    },
    withUnexistTeacherIdForDean:{
        name:string,
        dean?:string | null,
        desc:string,
        address:string
    }

}