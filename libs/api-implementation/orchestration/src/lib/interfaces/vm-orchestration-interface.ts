import { VMInterface } from '../../../../util/src/lib/interfaces/vm-interface';
import { Type } from '../dto/create-machine.dto';

export interface VMOrchestrationInterface {
  createMachine(name: string, type: Type): void;

  reset(name: string): void;

  start(name: string): void;

  stop(name: string): void;

  deleteMachine(name: string): void;

  getNumberOfRunningInstances(): number;

  getNumberOfTotalInstances(): number;

  getRunningInstances(): VMInterface[];

  getAllInstances(): VMInterface[];
}
