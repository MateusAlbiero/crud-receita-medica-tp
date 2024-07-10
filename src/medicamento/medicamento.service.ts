import { Injectable } from '@nestjs/common';

export interface Medicamento {
    controle: number;
    descricao: string;
    classeterapeutica?: string;
    classificacao?: string;
    tarja: string;
    registroms: string;
    fabricante?: string;
    tipomedicamento?: string;
    controlado: boolean;
}

@Injectable()
export class MedicamentoService {
    public medicamentos: Medicamento[] = [];
    public controle = 1;

    findAll(): Medicamento[] {
        return this.medicamentos;
    }

    findOne(controle: number): Medicamento {
        return this.medicamentos.find(medicamento => medicamento.controle === controle);
    }

    busca(query: string): Medicamento[] {
        return this.medicamentos.filter(medicamento => 
            medicamento.descricao.includes(query) ||
            medicamento.registroms.includes(query) ||
            medicamento.fabricante.includes(query)
        ).slice(0, 10);
    }

    cadastro(medicamentoData: Omit<Medicamento, 'controle'>): Medicamento {
        const medicamento: Medicamento = {
            ...medicamentoData,
            controle: this.controle++,
        };
        this.medicamentos.push(medicamento);
        return medicamento;
    }

    editar(controle: number, medicamentoData: Partial<Omit<Medicamento, 'controle'>>): Medicamento {
        const index = this.medicamentos.findIndex(m => m.controle === controle);
        if (index === -1) {
            throw new Error('Medicamento não encontrado');
        }
        const updatedMedicamento = {
            ...this.medicamentos[index],
            ...medicamentoData,
        };
        this.medicamentos[index] = updatedMedicamento;
        return updatedMedicamento;
    }

    remover(controle: number): void {
        const index = this.medicamentos.findIndex(m => m.controle === controle);
        if (index === -1) {
            throw new Error('Medicamento não encontrado');
        }
        this.medicamentos.splice(index, 1);
    }
}