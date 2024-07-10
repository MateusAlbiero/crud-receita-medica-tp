import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicamentoService } from './medicamento.service';
import { MedicamentoController } from './medicamento.controller';
import { Medicamento } from './entities/medicamento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Medicamento])],
  providers: [MedicamentoService],
  controllers: [MedicamentoController]
})
export class MedicamentoModule {}
