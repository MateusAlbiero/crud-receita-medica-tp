import { Injectable, NotFoundException } from '@nestjs/common';

export interface Medico {
    controle: number;
    nome: string;
    especialidade: string;
    cpf: string;
    crm: string;
    endereco: string;
    bairro: string;
    cidade: string;
    uf: string;
    telefone?: string;
    celular?: string;
    email?: string;
    ativo: boolean;
}

@Injectable()
export class MedicoService {
    private medicos: Medico[] = [];
    private controle = 1;

    findAll(): Medico[] {
        return this.medicos.filter(medico => medico.ativo);
    }

    findOne(controle: number): Medico {
        const medico = this.medicos.find(medico => medico.controle === controle && medico.ativo);
        if (!medico) {
            throw new NotFoundException('Médico não encontrado.');
        }
        return medico;
    }

    busca(query: string): Medico[] {
        return this.medicos.filter(medico => 
            medico.ativo &&
            (medico.controle.toString() === query ||
            medico.nome.includes(query) ||
            medico.email.includes(query) ||
            medico.cpf.includes(query.replace(/\D/g, '')) ||
            medico.telefone.includes(query.replace(/\D/g, '')) ||
            medico.celular.includes(query.replace(/\D/g, '')))
        ).slice(0, 10);
    }

    cadastro(medicoData: Omit<Medico, 'controle' | 'ativo'>): Medico {
        const medico: Medico = {
            ...medicoData,
            controle: this.controle++,
            ativo: true,
        };
        this.medicos.push(medico);
        return medico;
    }

    editar(controle: number, medicoData: Partial<Omit<Medico, 'controle' | 'ativo'>>): Medico {
        const index = this.medicos.findIndex(m => m.controle === controle);
        if (index === -1) {
            throw new NotFoundException('Médico não encontrado.');
        }
        const updatedMedico = {
            ...this.medicos[index],
            ...medicoData,
        };
        this.medicos[index] = updatedMedico;
        return updatedMedico;
    }

    inativar(controle: number): void {
        const index = this.medicos.findIndex(m => m.controle === controle);
        if (index === -1) {
            throw new NotFoundException('Médico não encontrado.');
        }
        this.medicos[index].ativo = false;
    }
}