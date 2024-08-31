import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateInstructorDto {
    @IsString()
    @IsNotEmpty()
    instructorName: string

    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    tel: string

    @IsString()
    @IsNotEmpty()
    @Length(5,50)
    password: string

}

export class UpdateInstructorDto extends PartialType(CreateInstructorDto) {}
