export interface NewsDataProps{
    body:{
        title:string;
        short_desc:string;
        desc:string;
        date:string;
    },
    withoutTitle:{
        short_desc:string;
        desc:string;
        date:string;
    },
    withoutShortDesc:{
        title:string;
        desc:string;
        date:string;
    },
    withoutDesc:{
        title:string;
        short_desc:string;
        date:string;
    },
    withoutDate:{
        title:string;
        short_desc:string;
        desc:string;
    }
}