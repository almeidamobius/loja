/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DestinoEntity } from './destino.entity';

@Injectable()
export class DestinoRepository {
  private destinos: DestinoEntity[] = [];

  async salvar(destino: DestinoEntity) {
    this.destinos.push(destino);
  }

  async listar() {
    return this.destinos;
  }

  private buscaPorId(id: string) {
    const possivelDestino = this.destinos.find(
      (destinoSalvo) => destinoSalvo.id === id,
    );

    if (!possivelDestino) {
      throw new Error('Usuário não existe');
    }

    return possivelDestino;
  }

  async atualiza(id: string, dadosDeAtualizacao: Partial<DestinoEntity>) {
    const destinoId = this.buscaPorId(id);

    Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
      if (chave === 'id') {
        return;
      }

      destinoId[chave] = valor;
    });

    return destinoId;
  }

  async remove(id: string) {
    const destinoId = this.buscaPorId(id);
    this.destinos = this.destinos.filter((usuarioSalvo) => {
      usuarioSalvo.id !== id;
    });

    return destinoId;
  }

  async findRandom(): Promise<DestinoEntity[]> {
    const count = this.destinos.length;
    if (count < 3) {
      return count === 0 ? [] : this.destinos; // Retorna todos disponíveis se menos de 3
    }

    const randomDepoimentos = new Set<DestinoEntity>();
    while (randomDepoimentos.size < 3) {
      const randomIndex = Math.floor(Math.random() * count);
      randomDepoimentos.add(this.destinos[randomIndex]);
    }
    return Array.from(randomDepoimentos);
  }
}
