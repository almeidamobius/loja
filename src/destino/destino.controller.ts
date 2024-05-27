/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { DestinoRepository } from './destino.repository';
import { CriarDestinoDTO } from './dto/CriarDestino.dto';
import { DestinoEntity } from './destino.entity';
import { v4 as uuid } from 'uuid';
import { ListaDestinoDTO } from './dto/ListaDestino.dto';
import { AtualizaDestinoDTO } from './dto/AtualizaDestino.dto';

@Controller('/destinos')
export class DestinoController {
  constructor(private destinoRepository: DestinoRepository) {}

  @Post()
  async criaDestino(@Body() dadosDoDestino: CriarDestinoDTO) {
    const destinoEntity = new DestinoEntity();
    destinoEntity.foto = dadosDoDestino.foto;
    destinoEntity.nome = dadosDoDestino.nome;
    destinoEntity.preco = dadosDoDestino.preco;
    destinoEntity.id = uuid();

    this.destinoRepository.salvar(destinoEntity);
    return {
      id: new ListaDestinoDTO(destinoEntity.id),
      destino: new ListaDestinoDTO(destinoEntity.nome),
      preco: new ListaDestinoDTO(destinoEntity.preco),
      mensagem: 'destino criado',
    };
  }

  @Get()
  async listaOuFiltraDestinos(@Query('nome') nomeDestino?: string) {
    try {
      const destinos = nomeDestino
        ? await this.destinoRepository.buscarPorNome(nomeDestino)
        : await this.destinoRepository.listar();
  
      if (destinos.length === 0) {
        return { mensagem: 'Nenhum destino foi encontrado' };
      }
  
      return destinos.map(destino => ({
        foto: destino.foto,
        nome: destino.nome,
        preco: destino.preco,
      }));
    } catch (error) {
      return { mensagem: 'Nenhum destino foi encontrado' };
    }
  }
  @Put('/:id')
  async atualizaUsuario(
    @Param('id') id: string,
    @Body() novosDados: AtualizaDestinoDTO, 
  ) {
    const destinoAtualizado = await this.destinoRepository.atualiza(
      id,
      novosDados,
    );
    return {
      destino: destinoAtualizado,
      mensagem: 'Destino atualizado com sucesso',
    };
  }

  @Delete('/:id')
  async removeDestino(@Param('id') id: string) {
    const destinoRemovido = await this.destinoRepository.remove(id);

    return {
      destino: destinoRemovido,
      mensagem: 'Depoimento removido com sucesso',
    };
  }

  
}
