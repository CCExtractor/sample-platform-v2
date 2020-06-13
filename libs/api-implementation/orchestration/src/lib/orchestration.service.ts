// TODO: parse errors properly
// TODO: encapsulate the logic inside of methods
import { VMOrchestrationInterface } from "./interfaces/vm-orchestration-interface";
import { VMInterface } from "../../../util/src/lib/interfaces/vm-interface";
import * as Compute from "@google-cloud/compute";
import { Injectable } from "@nestjs/common";
import { HashTable } from "../../../util/src/lib/interfaces/hashtable-interface";
import { VM } from "../../../util/src/lib/vm.impl";
import { Status } from "../../../util/src/lib/interfaces/status-enum";
import { throwError } from 'rxjs';


@Injectable()
export class VMOrchestrationService implements VMOrchestrationInterface {
    
    private compute;
    private zone;
    private machines: HashTable<VM>;
    private runningMachines: VM[];
    private numOfTotalInstances: number;

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
            this.runningMachines.push(this.machines[name]);
            this.numOfTotalInstances++;
            console.log("Created the following machine: \n" + operation.metadata)
        } catch (error) {
            throw(error)
        }
    }
    
    private async createVM(name) {
        let vm, operation;
        if (process.env.NODE_ENV != 'test') {
            [vm, operation] = await this.zone.createVM(name, { os: 'ubuntu' });
        }
        this.machines[name] = new VM(name, Status.Running, vm);
        return [this.machines[name], operation]    
    }

    async reset(name: string) {
        try {
            const response = await this.machines[name].getInstance().reset();
            console.log(response);
        } catch (error) {
            console.error(error)
        }
    }

    async start(name: string) {
        try {
            const response = await this.machines[name].getInstance().start();
            this.runningMachines.push(this.machines[name]);
            console.log(response);
        } catch (error) {
            console.error(error)   
        }
    }
    async stop(name: string) {
        try {
            const response = await this.machines[name].getInstance().stop();
            const index = this.runningMachines.indexOf(this.machines[name].getInstance());
            if (index > -1) {
                this.runningMachines.splice(index, 1);
            }
            console.log(response);
        } catch (error) {
            console.error(error)
        }
    }
    async deleteMachine(name: string) {
        try {
            if (this.machines[name].getStatus() == Status.Running) {
                const index = this.runningMachines.indexOf(this.machines[name].getInstance());
                this.runningMachines.splice(index, 1);
            }
            this.numOfTotalInstances--;
            const response = await this.machines[name].getInstance().delete();
            console.log(response);
        } catch (error) {
            console.error(error)
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
