import { Controller, Get, Post, Put, Delete, Param, Body, Query, NotFoundException, Res } from '@nestjs/common';
import { PacienteService } from './paciente.service';
import { Response } from 'express';

@Controller('pacientes')
export class PacienteController {
    constructor(private readonly pacienteService: PacienteService) {}

    @Get()
    index(@Res() res: Response) {
        return res.render('');
    }

    @Get('cadastro/:controle?')
    cadastro(@Param('controle') controle: number, @Res() res: Response) {
        let
            paciente = null;
        if (controle) {
            paciente = this.pacienteService.findOne(controle);
            if (!paciente) {
                throw new NotFoundException();
            }
        }
        return res.render('', { paciente });
    }

    @Get('buscar/:controle?')
    buscar(@Query('d') d: string, @Param('controle') controle: number) {
        if (controle) {
            const
                paciente = this.pacienteService.findOne(controle);
            if (!paciente) {
                throw new NotFoundException();
            }
            return paciente;
        }
        return this.pacienteService.busca(d);
    }

    @Get('getpaciente')
    getpaciente() {
        return this.pacienteService.findAll();
    }

    @Post('gravar')
    gravar(@Body() dados: any, @Res() res: Response) {
        const
            cpf = dados.cpf.replace(/\D/g, '');
        const
            errors = [];

        if (!cpf) {
            errors.push({ field: '#cpf', message: '* Campo obrigatório' });
        }

        if (dados.controle) {
            const
                existingPaciente = this.pacienteService.findAll().some(p => p.cpf === cpf && p.controle !== dados.controle);
            if (existingPaciente) {
                errors.push({ field: '#cpf', message: '* CPF já foi cadastrado' });
            }
        } else {
            const
                existingPaciente = this.pacienteService.findAll().some(p => p.cpf === cpf);
            if (existingPaciente) {
                errors.push({ field: '#cpf', message: '* CPF já foi cadastrado' });
            }
        }

        if (!dados.nome) {
            errors.push({ field: '#nome', message: '* Campo obrigatório' });
        }
        if (!dados.cep) {
            errors.push({ field: '#cep', message: '* Campo obrigatório' });
        }
        if (!dados.uf) {
            errors.push({ field: '#uf', message: '* Campo obrigatório' });
        }
        if (!dados.cidade) {
            errors.push({ field: '#cidade', message: '* Campo obrigatório' });
        }
        if (!dados.endereco) {
            errors.push({ field: '#endereco', message: '* Campo obrigatório' });
        }
        if (!dados.bairro) {
            errors.push({ field: '#bairro', message: '* Campo obrigatório' });
        }
        if (!dados.email) {
            errors.push({ field: '#email', message: '* Campo obrigatório' });
        }

        if (errors.length) {
            return res.json({ status: 'error', errors });
        }

        try {
            let
                paciente = this.pacienteService.findOne(dados.controle);
            if (!paciente) {
                paciente = this.pacienteService.cadastro(dados);
            } else {
                this.pacienteService.editar(dados.controle, dados);
            }

            return res.json({
                status: 'success',
                message: 'Dados salvos com sucesso.',
            });
        } catch (e) {
            return res.json({
                status: 'error',
                message: 'Falha ao gravar os dados.' + e.message,
            });
        }
    }
}
