// TODO: parse errors properly
// TODO: encapsulate the logic inside of methods
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
import { execSync, exec } from 'child_process'

@Injectable()
export class VMOrchestrationService implements VMOrchestrationInterface {
  private compute;
  private machines: HashTable<VM>;
  private runningMachines: VM[];
  private numOfTotalInstances: number;
  private zone;

  constructor(compute: Compute) {
    this.compute = compute;
    this.zone = this.compute.zone('us-central1-c');
    this.numOfTotalInstances = 0;
    this.runningMachines = [];
    this.machines = {};
  }

  async createMachine(name: string) {
    try {
      const [vm, operation] = await this.createVM(name);
      this.runningMachines.push(vm);
      this.numOfTotalInstances++;
      console.log('Created the following machine: \n' + operation.metadata);
    } catch (error) {
      throw error;
    }
  }

  public async createVM(name: string) {
    let vm, operation;
    const config = await this.getConfigFile();
    [vm, operation] = await this.zone.createVM(name, config);
    this.machines[name] = new VM(name, Status.Running, vm);
    return [this.machines[name], operation];
  }

  private async getConfigFile() {
    
    const script = await doAsync(fs).readFile(
      path.resolve(__dirname, `../../../script.sh`)
    );

    console.log(script.toString());

    return {
      os: 'ubuntu',
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
      const response = await this.machines[name].getInstance().reset();
      console.log(response);
    } catch (error) {
      throw error;
    }
  }

  async start(name: string) {
    try {
      const response = await this.machines[name].getInstance().start();
      this.runningMachines.push(this.machines[name]);
      console.log(response);
    } catch (error) {
      throw error;
    }
  }
  async stop(name: string) {
    try {
      const response = await this.machines[name].getInstance().stop();
      const index = this.runningMachines.indexOf(
        this.machines[name].getInstance()
      );
      if (index > -1) {
        this.runningMachines.splice(index, 1);
      }
      console.log(response);
    } catch (error) {
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
      const response = await this.machines[name].getInstance().delete();
      console.log(response);
    } catch (error) {
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
