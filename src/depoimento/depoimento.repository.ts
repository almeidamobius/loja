/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DepoimentoEntity } from './depoimento.entity';

@Injectable()
export class DepoimentoRepository {
  private depoimentos: DepoimentoEntity[] = [];

  async salvar(depoimento: DepoimentoEntity) {
    this.depoimentos.push(depoimento);
  }

  async listar() {
    return this.depoimentos;
  }

  private buscaPorId(id: string) {
    const possivelDepoimento = this.depoimentos.find(
      (depoimentoSalvo) => depoimentoSalvo.id === id,
    );

    if (!possivelDepoimento) {
      throw new Error('Usuário não existe');
    }

    return possivelDepoimento;
  }

  async atualiza(id: string, dadosDeAtualizacao: Partial<DepoimentoEntity>) {
    const depoimentoId = this.buscaPorId(id);

    Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
      if (chave === 'id') {
        return;
      }

      depoimentoId[chave] = valor;
    });

    return depoimentoId;
  }

  async remove(id: string) {
    const depoimentoId = this.buscaPorId(id);
    this.depoimentos = this.depoimentos.filter((usuarioSalvo) => {
      usuarioSalvo.id !== id;
    });

    return depoimentoId;
  }

  async findRandom(): Promise<DepoimentoEntity[]> {
    const count = this.depoimentos.length;
    if (count < 3) {
      return count === 0 ? [] : this.depoimentos; // Retorna todos disponíveis se menos de 3
    }

    const randomDepoimentos = new Set<DepoimentoEntity>();
    while (randomDepoimentos.size < 3) {
      const randomIndex = Math.floor(Math.random() * count);
      randomDepoimentos.add(this.depoimentos[randomIndex]);
    }
    return Array.from(randomDepoimentos);
  }
// eslint-disable-next-line prettier/prettier
}
