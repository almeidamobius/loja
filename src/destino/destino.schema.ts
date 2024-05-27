// destino.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class DestinoEntity {
  @Prop({ required: true })
  foto: string;

  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  preco: string;
}

export const DestinoSchema = SchemaFactory.createForClass(DestinoEntity);
