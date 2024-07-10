import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Paciente {
  @PrimaryGeneratedColumn()
  controle: number;

  @Column()
  nome: string;

  @Column()
  cpf: string;

  @Column()
  endereco: string;

  @Column()
  bairro: string;

  @Column()
  cidade: string;

  @Column()
  uf: string;

  @Column()
  telefone: string;

  @Column()
  celular: string;

  @Column()
  email: string;

  @Column()
  ativo: boolean;
}