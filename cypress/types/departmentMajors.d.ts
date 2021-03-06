export interface DepartmentMajorsDataProps{
    body:{
        majorId:string;
        departmentId:string;
        degree:string;
        code:string;
    },
    withoutMajorId:{
        departmentId:string;
        degree:string;
        code:string;
    },
    withoutDepartmentId:{
        majorId:string;
        degree:string;
        code:string;
    },
    withoutDegree:{
        majorId:string;
        departmentId:string;
        code:string;
    },
    withoutCode:{
        majorId:string;
        departmentId:string;
        degree:string;
    },
    withWrongTypeOfMajorId:{
        majorId:number;
        departmentId:string;
        degree:string;
        code:string;
    },
    withWrongTypeOfDepartmentId:{
        majorId:string;
        departmentId:number;
        degree:string;
        code:string;
    },
    withWrongTypeOfDegree:{
        majorId:string;
        departmentId:string;
        degree:number;
        code:string;
    },
    withWrongTypeOfCode:{
        majorId:string;
        departmentId:string;
        degree:string;
        code:number;
    }
}