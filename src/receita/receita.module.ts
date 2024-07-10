import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceitaService } from './receita.service';
import { ReceitaController } from './receita.controller';
import { Receita } from './entities/receita.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Receita])],
  providers: [ReceitaService],
  controllers: [ReceitaController]
})
export class ReceitaModule {}
