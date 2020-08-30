import { VMOrchestrationInterface } from '../interfaces/vm-orchestration-interface';
import { VMInterface } from '../../../../util/src/lib/interfaces/vm-interface';
import { Compute } from './compute.service';
import { Injectable } from '@nestjs/common';
import { HashTable } from '../../../../util/src/lib/interfaces/hashtable-interface';
import { VM } from '../../../../util/src/lib/vm.impl';
import { Status } from '../../../../util/src/lib/interfaces/status-enum';
import { AppConfig } from '../../../../../../config';
import * as fs from 'fs';
import * as doAsync from 'doasync';
import * as path from 'path';
import { Type } from '../dto/create-machine.dto';

@Injectable()
export class VMOrchestrationService implements VMOrchestrationInterface {
  private compute;
  private machines: HashTable<VM>;
  private runningMachines: VM[];
  private numOfTotalInstances: number;
  private zone;

  constructor(compute: Compute) {
    this.compute = compute;
    //TODO: put the zone in config file
    this.zone = this.compute.zone('us-central1-c');
    this.numOfTotalInstances = 0;
    this.runningMachines = [];
    this.machines = {};
  }

  async createMachine(name: string, type: Type) {
    try {
      const [vm, operation] = await this.createVM(name, type);
      this.runningMachines.push(vm);
      this.numOfTotalInstances++;
    } catch (error) {
      console.error('Error while machine creation:');
      console.debug(error.stack);
      throw error;
    }
  }

  async createVM(name: string, type: Type) {
    let vm, operation;
    const config = await this.getConfigFile(name, type);
    [vm, operation] = await this.zone.createVM(name, config);
    this.machines[name] = new VM(name, Status.Running, vm);
    return [this.machines[name], operation];
  }

  private async getConfigFile(name: string, type: Type) {
    let script = await doAsync(fs).readFile(
      //TODO make it more flexible
      path.resolve(__dirname, `../../../${AppConfig.EXECUTABLE_SCRIPT}`)
    );

    script = script.toString()

    script = script.replace(/EXTERNAL_IP/g, AppConfig.EXTERNAL_IP)
    script = script.replace(/GITHUB_EVENT/g, type)
    script = script.replace(/EVENT_IDENTIFICATOR/g, name)

    console.log("HIBLJDAD" + script);
    
    return 
    return {
      os: 'ubuntu-1804',
      http: true,
      metadata: {
        items: [
          {
            key: 'startup-script',
            value: script.toString(),
          },
        ],
      },
    };
  }

  async reset(name: string) {
    try {
      await this.machines[name].getInstance().reset();
    } catch (error) {
      console.error(`Error occured while reseting the machine ${name}`);
      console.debug(error.stack);
      throw error;
    }
  }

  async start(name: string) {
    try {
      await this.machines[name].getInstance().start();
      this.runningMachines.push(this.machines[name]);
    } catch (error) {
      console.error(`Error occured while starting the machine ${name}`);
      console.debug(error.stack);
      throw error;
    }
  }

  async stop(name: string) {
    try {
      await this.machines[name].getInstance().stop();
      const index = this.runningMachines.indexOf(
        this.machines[name].getInstance()
      );
      if (index > -1) {
        this.runningMachines.splice(index, 1);
      }
    } catch (error) {
      console.error(`Error occured while stopping machine`);
      console.debug(error.stack);
      throw error;
    }
  }

  async deleteMachine(name: string) {
    try {
      if (this.machines[name].getStatus() == Status.Running) {
        const index = this.runningMachines.indexOf(
          this.machines[name].getInstance()
        );
        this.runningMachines.splice(index, 1);
      }
      this.numOfTotalInstances--;
      await this.machines[name].getInstance().delete();
    } catch (error) {
      console.error(`Error occured while deleting the machine ${name}`);
      console.debug(error.stack);
      throw error;
    }
  }

  getNumberOfRunningInstances(): number {
    return this.runningMachines.length;
  }
  getNumberOfTotalInstances(): number {
    return this.numOfTotalInstances;
  }
  getRunningInstances(): VMInterface[] {
    return this.runningMachines;
  }
  getAllInstances(): VMInterface[] {
    const allInstances = [];
    for (const key in this.machines) {
      if (this.machines.hasOwnProperty(key)) {
        allInstances.push(this.machines[key]);
      }
    }
    return allInstances;
  }
}
