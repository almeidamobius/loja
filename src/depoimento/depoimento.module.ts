import { Module } from "@nestjs/common";
import { DepoimentoController } from "./depoimento.controller";
import { DepoimentoRepository } from "./depoimento.repository";



@Module({
    controllers: [DepoimentoController],
    providers: [DepoimentoRepository]

})

export class DepoimentoModule{}