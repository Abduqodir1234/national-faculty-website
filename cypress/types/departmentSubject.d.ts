export interface DepartmentSubjectsDataProps{
        body:{
            subjectId:string;
            departmentId:string;
            degree:string;
        },
        withoutSubjectId:{
            departmentId:string;
            degree:string;
        },
        withoutDepartmentId:{
            subjectId:string;
            degree:string;
        },
        withoutDegree:{
            subjectId:string;
            departmentId:string;
        },
        withWrongTypeOfSubjectId:{
            subjectId:number;
            departmentId:string;
            degree:string;
        },
        withWrongTypeOfDepartmentId:{
            subjectId:string;
            departmentId:number;
            degree:string;
        },
        withWrongTypeOfDegree:{
            subjectId:string;
            departmentId:string;
            degree:number;
        },
}