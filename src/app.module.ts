import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { DepoimentoModule } from './depoimento/depoimento.module';
import { DestinoModule } from './destino/destino.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsuarioModule,
    DepoimentoModule,
    DestinoModule,
    MongooseModule.forRoot(
      'mongodb+srv://almeida_mobius:%40Juju230305@cluster0.qul6dbq.mongodb.net/',
    ),
  ],
})
export class AppModule {}
