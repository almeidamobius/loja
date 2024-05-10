import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { EmailEhUnico } from "../validacao/email-eh-unico.validator";

export class atualizaUsuarioDTO {

    @IsNotEmpty({ message: 'Nome não pode ser vazio'})
    @IsOptional()
    nome : string;

    @IsEmail(undefined, {message: 'O email informado é invalido'})
    @EmailEhUnico({message: 'Já existe usuário com este e-mail'})
    @IsOptional()
    email : string;

    @MinLength(6, {message: 'A senha precisa conter pelo menos 6 caracteres'})
    @IsOptional()
    senha: string;
}