import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medico } from './medico.entity';

@Injectable()
export class MedicoService {
  constructor(
    @InjectRepository(Medico)
    private readonly medicoRepository: Repository<Medico>,
  ) {}

  async findAll(): Promise<Medico[]> {
    return await this.medicoRepository.find();
  }

  async findOne(id: number): Promise<Medico> {
    const medico = await this.medicoRepository.findOne(id);
    if (!medico) {
      throw new NotFoundException(`Médico com ID ${id} não encontrado`);
    }
    return medico;
  }

  async create(medico: Medico): Promise<Medico> {
    return await this.medicoRepository.save(medico);
  }

  async update(id: number, medico: Medico): Promise<Medico> {
    await this.medicoRepository.update(id, medico);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.medicoRepository.delete(id);
  }
}