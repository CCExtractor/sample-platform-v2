import { VMInterface } from "../../../../util/src/lib/Interfaces/vm-interface";

export interface VMOrchestrationInterface {
  
  createMachine(name: String): void;
  
  reset(): void;
  
  start(): void;
  
  stop(): void;
  
  killMachine(): void;
  

  getNumberOfRunningInstances(): number 

  getNumberOfTotalInstances(): number

  getRunningInstances(): VMInterface[]

  getAllInstances(): VMInterface[]
}  
  