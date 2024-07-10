import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Receita {
  @PrimaryGeneratedColumn()
  controle: number;

  @Column()
  prescricao: string;

  @Column()
  especialidade: string;

  @Column()
  codpaciente: number;

  @Column()
  codmedico: number;

  @Column()
  codmedicamento: number;

  @Column()
  dataprescricao: Date;

  @Column()
  dosagem: string;
}