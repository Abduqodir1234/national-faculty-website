export interface AdminstrationDocument{
    teacherId:string;
    reception_time_starts:string;
    reception_time_ends:string;
}

export interface AdminstrationQueryProps{
    page?:number;
    teacherId:string;
    departmentId:string;
}