import { VMOrchestrationService } from './orchestration.service'
import { CreateMachineDTO } from './dto/create-machine.dto';

describe('Orchestration service', () => {
  let vmOrchestrationService: VMOrchestrationService;

  beforeEach(() => {
    vmOrchestrationService = new VMOrchestrationService();
  })
  
  describe('createMachine', () => {
    it('should be created', () => {
      expect(vmOrchestrationService).toBeTruthy();
    });

    it('should successfully create a machine', async () => {
      const createMachineDTO = new CreateMachineDTO();
      createMachineDTO.name = "test";
      await vmOrchestrationService.createMachine('test');
      expect(vmOrchestrationService.getNumberOfRunningInstances()).toEqual(1);
    });
  });
});