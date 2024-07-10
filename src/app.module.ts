import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteModule } from './paciente/paciente.module';
import { MedicamentoModule } from './medicamento/medicamento.module';
import { MedicoModule } from './medico/medico.module';
import { ReceitaModule } from './receita/receita.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: '',
      password: '',
      database: '',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    PacienteModule,
    MedicamentoModule,
    MedicoModule,
    ReceitaModule,
  ],
})
export class AppModule {}
