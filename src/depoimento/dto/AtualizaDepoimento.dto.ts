import { IsNotEmpty, IsOptional } from "class-validator";


export class atualizaDepoimentoDTO {

    @IsNotEmpty({ message: 'Nome não pode ser vazio'})
    @IsOptional()
    depoimento : string;


}