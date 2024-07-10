import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicoService } from './medico.service';
import { MedicoController } from './medico.controller';
import { Medico } from './entities/medico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Medico])],
  providers: [MedicoService],
  controllers: [MedicoController]
})
export class MedicoModule {}
