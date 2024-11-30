import { IsEnum, IsString, IsNotEmpty } from "class-validator";

export class CreateParceiroDto {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  telefone: string;

  @IsNotEmpty()
  @IsEnum(["REBOQUE", "TRANSPORTE", "BOMBEIROS", "AMBULANCIA"])
  tipoServico: TipoServico;

  @IsNotEmpty()
  @IsString()
  address: string;
}

export enum TipoServico {
  REBOQUE = "REBOQUE",
  TRANSPORTE = "TRANSPORTE",
  BOMBEIROS = "BOMBEIROS",
  AMBULANCIA = "AMBULANCIA",
}
