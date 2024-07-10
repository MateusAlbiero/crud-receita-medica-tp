import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { MedicoService } from './medico.service';
import { Medico } from './medico.entity';

@Controller('medico')
export class MedicoController {
  constructor(private readonly medicoService: MedicoService) {}

  @Get()
  async findAll(): Promise<Medico[]> {
    return this.medicoService.findAll();
  }

  @Get(':controle')
  async findOne(@Param('controle') controle: number): Promise<Medico> {
    return this.medicoService.findOne(controle);
  }

  @Post()
  async create(@Body() medico: Medico): Promise<Medico> {
    return this.medicoService.create(medico);
  }

  @Put(':controle')
  async update(@Param('controle') controle: number, @Body() medico: Medico): Promise<Medico> {
    return this.medicoService.update(controle, medico);
  }

  @Delete(':controle')
  async remove(@Param('controle') controle: number): Promise<void> {
    return this.medicoService.remove(controle);
  }
}
