import { Controller, Get, Post, Param, Query, Body, NotFoundException, Res } from '@nestjs/common';
import { MedicoService } from './medico.service';
import { Response } from 'express';

@Controller('medicos')
export class MedicoController {
    constructor(private readonly medicoService: MedicoService) {}

    @Get()
    async index(@Res() res: Response) {
        return res.render('');
    }

    @Get('cadastro/:id?')
    async cadastro(@Param('id') id: string, @Res() res: Response) {
        let medico = null;
        if (id) {
            medico = await this.medicoService.findOne(id);
            if (!medico) {
                throw new NotFoundException('Médico não encontrado.');
            }
        }
        return res.render('', { medico });
    }

    @Get('buscar/:id?')
    async buscar(@Query('d') d: string, @Param('id') id: string) {
        if (id) {
            const medico = await this.medicoService.findOne(id);
            if (!medico) {
                throw new NotFoundException('Médico não encontrado.');
            }
            return medico;
        }
        return this.medicoService.busca(d);
    }

    @Get('getmedico')
    async getMedico() {
        return this.medicoService.findAll();
    }

    @Post('gravar')
    async gravar(@Body() dados: any, @Res() res: Response) {
        const cpf = dados.cpf.replace(/\D/g, '');
        const errors = [];

        if (!cpf) {
            errors.push({ field: '#cpf', message: '* Campo obrigatório' });
        }

        if (dados.controle) {
            const existingMedico = await this.medicoService.findAll().some(m => m.cpf === cpf && m.controle !== dados.controle);
            if (existingMedico) {
                errors.push({ field: '#cpf', message: '* CPF já foi cadastrado' });
            }
        } else {
            const existingMedico = await this.medicoService.findAll().some(m => m.cpf === cpf);
            if (existingMedico) {
                errors.push({ field: '#cpf', message: '* CPF já foi cadastrado' });
            }
        }

        if (!dados.nome) {
            errors.push({ field: '#nome', message: '* Campo obrigatório' });
        }
        if (!dados.especialidade) {
            errors.push({ field: '#especialidade', message: '* Campo obrigatório' });
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
            let medico = await this.medicoService.findOne(dados.controle);
            if (!medico) {
                medico = await this.medicoService.cadastro(dados);
            } else {
                await this.medicoService.editar(dados.controle, dados);
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
