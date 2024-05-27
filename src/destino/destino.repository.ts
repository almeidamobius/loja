import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DestinoEntity } from './destino.schema';

@Injectable()
export class DestinoRepository {
  constructor(
    @InjectModel(DestinoEntity.name) private destinoModel: Model<DestinoEntity>,
  ) {}

  async salvar(destino: DestinoEntity): Promise<DestinoEntity> {
    const novoDestino = new this.destinoModel(destino);
    return novoDestino.save();
  }

  async listar(): Promise<DestinoEntity[]> {
    return this.destinoModel.find().exec();
  }

  async atualiza(id: string, dadosDeAtualizacao: Partial<DestinoEntity>) {
    const destino = await this.destinoModel.findById(id);
    if (!destino) {
      throw new Error('Destino não encontrado');
    }

    Object.assign(destino, dadosDeAtualizacao);
    await destino.save();
    return destino;
  }

  async remove(id: string) {
    const result = await this.destinoModel.findByIdAndDelete(id);
    if (!result) {
      throw new Error('Destino não encontrado para remover');
    }
    return result;
  }

  async buscarPorNome(nome: string): Promise<DestinoEntity[]> {
    return this.destinoModel
      .find({ nome: { $regex: nome, $options: 'i' } })
      .exec();
  }
}
