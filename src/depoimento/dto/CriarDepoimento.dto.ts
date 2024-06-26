import { IsNotEmpty, IsString } from 'class-validator';

export class CriarDepoimentoDTO {
  @IsString()
  @IsNotEmpty()
  foto: string;

  @IsString()
  @IsNotEmpty()
  depoimento: string;

  @IsString()
  @IsNotEmpty()
  nome: string;
}
