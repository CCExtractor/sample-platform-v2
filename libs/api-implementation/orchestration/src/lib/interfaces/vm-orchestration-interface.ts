import { VMInterface } from "../../../../util/src/lib/interfaces/vm-interface";

export interface VMOrchestrationInterface {
  
  createMachine(name: string): void;
  
  reset(name: string): void;
  
  start(name: string): void;
  
  stop(name: string): void;
  
  deleteMachine(name: string): void;
  

  getNumberOfRunningInstances(): number 

  getNumberOfTotalInstances(): number

  getRunningInstances(): VMInterface[]

  getAllInstances(): VMInterface[]
}  
  