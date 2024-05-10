import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import {DepoimentoModule} from './depoimento/depoimento.module';

@Module({
  imports: [UsuarioModule,DepoimentoModule],
  
})
export class AppModule {}