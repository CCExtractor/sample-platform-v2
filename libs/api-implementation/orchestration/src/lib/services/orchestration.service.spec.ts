import { VMOrchestrationService } from './orchestration.service'
import { CreateMachineDTO } from '../dto/create-machine.dto';
import { instantiateMocked } from '../../../../../testing/src/lib/testing.util'
import { Compute } from './compute.service';


describe('Orchestration service', () => {
  const compute = instantiateMocked(Compute)

  let vmOrchestrationService: VMOrchestrationService;

  beforeEach(() => {
    vmOrchestrationService = new VMOrchestrationService(compute);
  })
  
  describe('createMachine', () => {
    it('should be created', () => {
      expect(vmOrchestrationService).toBeTruthy();
    });

    it('should successfully create a machine', async () => {

      const createMachineDTO = new CreateMachineDTO();
      createMachineDTO.name = "test";

      jest.spyOn(vmOrchestrationService, 'createVM').mockImplementation((name): any => { 
        return ["", ""]
      })
      await vmOrchestrationService.createMachine('test');

      expect(vmOrchestrationService.createVM).toHaveBeenCalledTimes(1);
      expect(vmOrchestrationService.getNumberOfRunningInstances()).toEqual(1);
    });
  });
});
