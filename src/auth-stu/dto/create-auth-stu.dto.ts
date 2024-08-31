import { IsNotEmpty, IsString } from "class-validator";

export class CreateAuthStuDto {
    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}