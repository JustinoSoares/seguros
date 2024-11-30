import { IsEmail, IsOptional, IsString, IsUUID, MinLength } from "class-validator";


export class CreateUserDto {
    @IsUUID()
    id: string;

    @IsString()
    nome_completo: string;

    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    telefone: string;

    @IsString()
    @MinLength(6)
    senha: string;

    @IsString()
    bi : string

    @IsOptional()
    email_verify: string
}