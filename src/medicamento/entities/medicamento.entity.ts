import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Medicamento {
  @PrimaryGeneratedColumn()
  controle: number;
  
  @Column()
  descricao: string;
  
  @Column()
  classeterapeutica?: string;
  
  @Column()
  classificacao?: string;
  
  @Column()
  tarja: string;
  
  @Column()
  registroms: string;
  
  @Column()
  fabricante?: string;
  
  @Column()
  tipomedicamento?: string;
  
  @Column()
  controlado: boolean;
}