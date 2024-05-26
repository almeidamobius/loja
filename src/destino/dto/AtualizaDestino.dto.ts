import { IsOptional } from 'class-validator';

export class AtualizaDestinoDTO {
  @IsOptional() // Essa anotação pode ser opcional, dependendo dos requisitos
  foto: string;

  @IsOptional()
  nome: string;

  @IsOptional()
  preco: string;

  @IsOptional()
  id: any;
}