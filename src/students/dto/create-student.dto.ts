import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateStudentDto {
    @IsString()
    @IsNotEmpty()
    studentName: string

    @IsString()
    @IsNotEmpty()
    studentEmail: string

    @IsString()
    @IsNotEmpty()
    studentTel: string

    @IsString()
    @IsNotEmpty()
    studentPassword: string
}

export class UpdateStudentDto extends PartialType(CreateStudentDto) {}
