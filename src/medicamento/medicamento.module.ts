import { Module } from '@nestjs/common';
import { MedicamentoService } from './medicamento.service';
import { MedicamentoController } from './medicamento.controller';

@Module({
  providers: [MedicamentoService],
  controllers: [MedicamentoController]
})
export class MedicamentoModule {}
