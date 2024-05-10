import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import {DepoimentoRepository} from './depoimento.repository';
import { DepoimentoEntity } from "./depoimento.entity";
import { CriarDepoimentoDTO } from "./dto/CriarDepoimento.dto";
import { ListaDepoimentoDTO } from "./dto/ListaDepoimento.dto";
import { v4 as uuid} from 'uuid';
import { atualizaDepoimentoDTO } from "./dto/AtualizaDepoimento.dto";

@Controller('/depoimentos')

export class DepoimentoController {

        constructor(private depoimentoRepository: DepoimentoRepository){}

        @Post()
            async criarNovoDepoimento( @Body() novoDepoimento: CriarDepoimentoDTO) {
                const depoimentoEntity = new DepoimentoEntity();
                depoimentoEntity.depoimento = novoDepoimento.depoimento;
                depoimentoEntity.id = uuid()

               await this.depoimentoRepository.salvar(depoimentoEntity)

                return {
                    depoimento: new ListaDepoimentoDTO(depoimentoEntity.depoimento),
                    id: new ListaDepoimentoDTO(depoimentoEntity.id),
                    mensagem: 'Depoimento adicionado'
                }
 

            }
            @Get()
            async listUsuarios() {
                const depoimentosSalvos = await this.depoimentoRepository.listar(); 
                const depoimentosLista = depoimentosSalvos.map(
                    depoimento => new ListaDepoimentoDTO(
                        depoimento.id,
                       
                    )
                );
        
                return depoimentosLista;
            }
            @Put('/:id')
            async atualizaUsuario(@Param('id') id: string, @Body() novosDados: atualizaDepoimentoDTO){
               const depoimentoAtualizado = await this.depoimentoRepository.atualiza(id,novosDados);
               return {
                depoimento: depoimentoAtualizado,
                mesagem:'Depoimento atualizado com sucesso',
               
               }
        
            }
        
            @Delete('/:id')
            async removeUsuario(@Param('id') id: string) {
                const depoimentoRemovido = await this.depoimentoRepository.remove(id);
        
                return {
                    depoimento: depoimentoRemovido,
                    mensagem:'Depoimento removido com sucesso',
        
                }
            }
        
         
}



