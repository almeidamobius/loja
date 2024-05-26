/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DestinoController } from './destino.controller';
import { DestinoRepository } from './destino.repository';

@Module({
  controllers: [DestinoController],
  providers: [DestinoRepository],
})
export class DepoimentoModule {}
