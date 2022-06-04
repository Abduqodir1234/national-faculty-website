export interface ResourcesDataProps{
    body:{
        title:string;
        desc:string;
        categoryId:string
    },
    withoutTitle:{
        desc:string;
        categoryId:string
    },
    withoutDesc:{
        title:string;
        categoryId:string
    },
    withoutCategoryId:{
        title:string;
        desc:string;
    },
    withWrongTypeTitle:{
        title:number;
        desc:string;
        categoryId:string
    },
    withWrongTypeDesc:{
        title:string;
        desc:number;
        categoryId:string
    },

    withWrongTypeCategoryId:{
        title:string;
        desc:string;
        categoryId:number
    },

}