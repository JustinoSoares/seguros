import { IsEmail, IsEnum, IsJSON, IsString, IsUUID } from "class-validator";

export class createEmergenciaDto {
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
    @IsEnum(["REBOQUE", "TRANSPORTE", "BOMBEIROS", "AMBULANCIA"])
    tipo_problema: string;

    @IsJSON()
    localizacao: JSON;
}

