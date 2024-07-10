import { Test, TestingModule } from '@nestjs/testing';
import { MedicoController } from './medico.controller';

describe('MedicoController', () => {
  let controller: MedicoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicoController],
    }).compile();

    controller = module.get<MedicoController>(MedicoController);
  });

  it('Deve ser definido', () => {
    expect(controller).toBeDefined();
  });
});
