export interface TalentedStudentsDataTypes{
    body:{
        fullname:string,
        birthdate:string,
        address:string,
        title:string,
        majorId:string,
        specialization:string,
        desc:string
    },
    withoutFullname:{
        birthdate:string,
        address:string,
        title:string,
        majorId:string,
        specialization:string,
        desc:string
    },
    withoutBirthdate:{
        fullname:string,
        address:string,
        title:string,
        majorId:string,
        specialization:string,
        desc:string
    },
    withoutAddress:{
        fullname:string,
        birthdate:string,
        title:string,
        majorId:string,
        specialization:string,
        desc:string
    },
    withoutTitle:{
        fullname:string,
        birthdate:string,
        address:string,
        majorId:string,
        specialization:string,
        desc:string
    },
    withoutMajorId:{
        fullname:string,
        birthdate:string,
        address:string,
        title:string,
        specialization:string,
        desc:string
    },
    withoutSpecialization:{
        fullname:string,
        birthdate:string,
        address:string,
        title:string,
        majorId:string,
        desc:string
    },
    withoutDesc:{
        fullname:string,
        birthdate:string,
        address:string,
        title:string,
        majorId:string,
        specialization:string,
    },
    withFutureBirthdate:{
        fullname:string,
        birthdate:string,
        address:string,
        title:string,
        majorId:string,
        specialization:string,
        desc:string
    },
    withWrongTypeOfFullname:{
        fullname:number,
        birthdate:string,
        address:string,
        title:string,
        majorId:string,
        specialization:string,
        desc:string
    },
    withWrongTypeOfBirthdate:{
        fullname:string,
        birthdate:number,
        address:string,
        title:string,
        majorId:string,
        specialization:string,
        desc:string
    },
    withWrongTypeOfAddress:{
        fullname:string,
        birthdate:string,
        address:number,
        title:string,
        majorId:string,
        specialization:string,
        desc:string
    },
    withWrongTypeOfTitle:{
        fullname:string,
        birthdate:string,
        address:string,
        title:number,
        majorId:string,
        specialization:string,
        desc:string
    },
    withWrongTypeOfMajorId:{
        fullname:string,
        birthdate:string,
        address:string,
        title:string,
        majorId:number,
        specialization:string,
        desc:string
    },
    withWrongTypeOfSpecialization:{
        fullname:string,
        birthdate:string,
        address:string,
        title:string,
        majorId:string,
        specialization:number,
        desc:string
    },
    withUnexistMajorId:{
        fullname:string,
        birthdate:string,
        address:string,
        title:string,
        majorId:string,
        specialization:string,
        desc:string
    },
    withWrongTypeOfDesc:{
        fullname:string,
        birthdate:string,
        address:string,
        title:string,
        majorId:string,
        specialization:string,
        desc:number
    }
}