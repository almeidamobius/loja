/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
      destino: new ListaDestinoDTO(destinoEntity.id),
      preco: new ListaDestinoDTO(destinoEntity.preco),
      mensagem: 'destino criado',
    };
  }

  @Get()
  async ListaDestinos() {
    const destinosSalvos = await this.destinoRepository.listar();
    const destinosLista = destinosSalvos.map((destino) => {
      return {
        foto: destino.foto,
        nome: destino.nome,
        preco: destino.preco
      }
    });

    return destinosLista;
  }
  @Put('/:id')
  async atualizaUsuario(
    @Param('id') id: string,
    @Body() novosDados: AtualizaDestinoDTO, // Altere o tipo para AtualizaDestinoDTO
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
// eslint-disable-next-line prettier/prettier
}
