import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginDto {
    @IsEmail()
    readonly email: string;

    @MinLength(6)
    @IsNotEmpty()
    readonly password: string;
}