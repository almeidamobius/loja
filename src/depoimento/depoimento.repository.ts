import { Injectable } from "@nestjs/common";
import { DepoimentoEntity } from "./depoimento.entity";


@Injectable() 
export class DepoimentoRepository {
    private depoimentos: DepoimentoEntity[] = [];

    async salvar( depoimento : DepoimentoEntity) {
        this.depoimentos.push(depoimento);
    }

    async listar() {
        return this.depoimentos;
    }

    // async existeComEmail(email:string) {
    //     const possivelUsuario = this.depoimentos.find(
    //         usuario => usuario.email === email
    //     );

    //     return possivelUsuario != undefined;
    // }

    private buscaPorId(id: string) {
        const possivelDepoimento = this.depoimentos.find(
            depoimentoSalvo => depoimentoSalvo.id === id
        );

        if(!possivelDepoimento) {
            throw new Error('Usuário não existe');
        }

        return possivelDepoimento;
    }

    async atualiza(id:string, dadosDeAtualizacao: Partial<DepoimentoEntity>) {
       const depoimentoId = this.buscaPorId(id);

        Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
            if(chave === 'id'){
                return;
            }

            depoimentoId[chave] = valor;
        })

        return depoimentoId;
    }

    async remove(id: string) {
        const depoimentoId = this.buscaPorId(id);
        this.depoimentos = this.depoimentos.filter(
            usuarioSalvo => {
                usuarioSalvo.id !== id
            }
        );

        return depoimentoId;

    }
}
