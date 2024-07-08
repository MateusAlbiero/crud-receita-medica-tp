import { Injectable } from '@nestjs/common';

export interface Paciente {
    controle: number;
    nome: string;
    cpf: string;
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
export class PacienteService {
    public paciente: Paciente[] = [];
    public idCounter = 1;

    findAll(): Paciente[] {
        return this.paciente.filter(paciente => paciente.ativo);
    }

    findOne(controle: number): Paciente {
        return this.paciente.find(paciente => paciente.controle === controle && paciente.ativo);
    }

    busca(query: string): Paciente[] {
        return this.paciente.filter(paciente => 
            paciente.ativo &&
            (paciente.controle.toString() === query ||
            paciente.nome.includes(query) ||
            paciente.email.includes(query) ||
            paciente.cpf.includes(query.replace(/\D/g, '')) ||
            paciente.telefone.includes(query.replace(/\D/g, '')) ||
            paciente.celular.includes(query.replace(/\D/g, '')))
        ).slice(0, 10);
    }

    cadastro(pacienteData: Omit<Paciente, 'controle' | 'ativo'>): Paciente {
        const 
            paciente: Paciente = {
                ...pacienteData,
                controle: this.idCounter++,
                ativo: true,
            };
        this.paciente.push(paciente);
        return paciente;
    }

    editar(controle: number, pacienteData: Partial<Omit<Paciente, 'controle' | 'ativo'>>): Paciente {
        const
            index = this.paciente.findIndex(p => p.controle === controle);
        if (index === -1) {
            throw new Error('Paciente não encontrado');
        }
        const 
            updatedPaciente = {
                ...this.paciente[index],
                ...pacienteData,
            };
        
        this.paciente[index] = updatedPaciente;
        return updatedPaciente;
    }

    inativar(controle: number): void {
        const
            index = this.paciente.findIndex(p => p.controle === controle);
        if (index === -1) {
            throw new Error('Paciente não encontrado');
        }
        this.paciente[index].ativo = false;
    }
}