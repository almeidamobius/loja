import { IsNotEmpty } from "class-validator";


export class CriarDepoimentoDTO {

    @IsNotEmpty()
    depoimento: string;
    
}