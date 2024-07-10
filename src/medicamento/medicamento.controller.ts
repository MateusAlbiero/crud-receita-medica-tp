import { Controller, Get, Post, Param, Body, Query, NotFoundException, Res } from '@nestjs/common';
import { MedicamentoService } from './medicamento.service';
import { Response } from 'express';

@Controller('medicamentos')
export class MedicamentoController {
    constructor(private readonly medicamentoService: MedicamentoService) {}

    @Get()
    index(@Res() res: Response) {
        return res.render('');
    }

    @Get('cadastro/:controle?')
    cadastro(@Param('controle') controle: number, @Res() res: Response) {
        let medicamento = null;
        if (controle) {
            medicamento = this.medicamentoService.findOne(controle);
            if (!medicamento) {
                throw new NotFoundException();
            }
        }
        return res.render('', { medicamento });
    }

    @Get('buscar/:controle?')
    buscar(@Query('d') d: string, @Param('controle') controle: number) {
        if (controle) {
            const medicamento = this.medicamentoService.findOne(controle);
            if (!medicamento) {
                throw new NotFoundException();
            }
            return medicamento;
        }
        return this.medicamentoService.busca(d);
    }

    @Get('getmedicamento')
    getMedicamento() {
        return this.medicamentoService.findAll();
    }

    @Post('gravar')
    gravar(@Body() dados: any, @Res() res: Response) {
        const errors = [];

        if (!dados.descricao) {
            errors.push({ field: '#descricao', message: '* Campo obrigatório' });
        }
        if (!dados.tarja) {
            errors.push({ field: '#tarja', message: '* Campo obrigatório' });
        }
        if (!dados.registroms) {
            errors.push({ field: '#registroms', message: '* Campo obrigatório' });
        }
        if (!dados.controlado) {
            errors.push({ field: '#controlado', message: '* Campo obrigatório' });
        }

        if (errors.length) {
            return res.json({ status: 'error', errors });
        }

        try {
            let medicamento = this.medicamentoService.findOne(dados.controle);
            if (!medicamento) {
                medicamento = this.medicamentoService.cadastro(dados);
            } else {
                this.medicamentoService.editar(dados.controle, dados);
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
