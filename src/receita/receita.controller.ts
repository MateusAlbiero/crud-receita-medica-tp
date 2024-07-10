import { Controller, Get, Post, Param, Query, Body, NotFoundException, Res } from '@nestjs/common';
import { ReceitaService } from './receita.service';
import { Response } from 'express';

@Controller('receitas')
export class ReceitaController {
    constructor(private readonly receitaService: ReceitaService) {}

    @Get()
    index(@Res() res: Response) {
        return res.render('');
    }

    @Get('cadastro/:id?')
    async cadastro(@Param('id') id: number, @Res() res: Response) {
        let receita = null;
        if (id) {
            receita = await this.receitaService.findOne(id);
            if (!receita) {
                throw new NotFoundException();
            }
        }
        return res.render('', { receita });
    }

    @Get('buscar/:id?')
    async buscar(@Query('d') d: string, @Param('id') id: number) {
        if (id) {
            const receita = await this.receitaService.findOne(id);
            if (!receita) {
                throw new NotFoundException();
            }
            return receita;
        }
        return this.receitaService.busca(d);
    }

    @Get('getreceita')
    async getReceita() {
        return this.receitaService.findAll();
    }

    @Post('gravar')
    async gravar(@Body() dados: any, @Res() res: Response) {
        const { prescricao, dataprescricao, dosagem } = dados;
        const errors = [];

        if (!prescricao) {
            errors.push({ field: '#prescricao', message: '* Campo obrigatório' });
        }
        if (!dataprescricao) {
            errors.push({ field: '#dataprescricao', message: '* Campo obrigatório' });
        }
        if (!dosagem) {
            errors.push({ field: '#dosagem', message: '* Campo obrigatório' });
        }

        if (errors.length > 0) {
            return res.json({ status: 'error', errors });
        }

        try {
            let receita = await this.receitaService.findOne(dados.controle);
            if (!receita) {
                receita = await this.receitaService.cadastro(dados);
            } else {
                await this.receitaService.editar(dados.controle, dados);
            }

            return res.json({
                status: 'success',
                message: 'Dados salvos com sucesso.',
            });
        } catch (e) {
            return res.json({
                status: 'error',
                message: 'Falha ao gravar os dados: ' + e.message,
            });
        }
    }
}