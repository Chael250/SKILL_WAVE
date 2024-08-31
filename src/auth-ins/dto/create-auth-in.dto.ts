import { IsNotEmpty, IsString } from "class-validator";

export class CreateAuthInDto {
    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}
