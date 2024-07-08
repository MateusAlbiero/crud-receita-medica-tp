import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PacienteModule } from './paciente/paciente.module';
import { MedicamentoModule } from './medicamento/medicamento.module';
import { MedicoModule } from './medico/medico.module';
import { ReceitaModule } from './receita/receita.module';

@Module({
  imports: [PacienteModule, MedicamentoModule, MedicoModule, ReceitaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
