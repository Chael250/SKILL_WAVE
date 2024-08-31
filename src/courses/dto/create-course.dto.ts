import { PartialType } from "@nestjs/mapped-types"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    courseName: string

    @IsString()
    @IsNotEmpty()
    courseDescription: string
}

export class UpdateCourseDto extends PartialType(CreateCourseDto) {}
