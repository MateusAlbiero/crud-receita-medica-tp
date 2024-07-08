import { Module } from '@nestjs/common';
import { MedicoService } from './medico.service';
import { MedicoController } from './medico.controller';

@Module({
  providers: [MedicoService],
  controllers: [MedicoController]
})
export class MedicoModule {}
