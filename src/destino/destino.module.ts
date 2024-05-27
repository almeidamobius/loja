import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DestinoController } from './destino.controller';
import { DestinoRepository } from './destino.repository';
import { DestinoSchema } from './destino.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'DestinoEntity', schema: DestinoSchema },
    ]),
  ],
  controllers: [DestinoController],
  providers: [DestinoRepository],
})
export class DestinoModule {}
