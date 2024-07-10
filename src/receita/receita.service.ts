import { Injectable } from '@nestjs/common';

export interface Receita {
    controle: number;
    prescricao: string;
    especialidade: string;
    codpaciente: number;
    codmedico: number;
    codmedicamento: number;
    dataprescricao: Date;
    dosagem: string;
}

@Injectable()
export class ReceitaService {
    private receitas: Receita[] = [];
    private controle = 1;

    findAll(): Receita[] {
        return this.receitas;
    }

    findOne(controle: number): Receita {
        return this.receitas.find(receita => receita.controle === controle);
    }

    busca(query: string): Receita[] {
        return this.receitas.filter(receita =>
            receita.prescricao.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 10);
    }

    cadastro(receitaData: Omit<Receita, 'controle'>): Receita {
        const receita: Receita = {
            ...receitaData,
            controle: this.controle++,
        };
        this.receitas.push(receita);
        return receita;
    }

    editar(controle: number, receitaData: Partial<Omit<Receita, 'controle'>>): Receita {
        const index = this.receitas.findIndex(receita => receita.controle === controle);
        if (index === -1) {
            throw new Error('Receita não encontrada');
        }
        const updatedReceita: Receita = {
            ...this.receitas[index],
            ...receitaData,
        };
        this.receitas[index] = updatedReceita;
        return updatedReceita;
    }

    delete(controle: number): void {
        const index = this.receitas.findIndex(receita => receita.controle === controle);
        if (index === -1) {
            throw new Error('Receita não encontrada');
        }
        this.receitas.splice(index, 1);
    }
}