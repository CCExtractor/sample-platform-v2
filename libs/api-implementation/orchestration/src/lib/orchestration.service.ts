// TODO: parse errors properly
// TODO: encapsulate the logic inside of methods
import { VMOrchestrationInterface } from "./interfaces/vm-orchestration-interface";
import { VMInterface } from "../../../util/src/lib/Interfaces/vm-interface";
import Compute from "@google-cloud/compute";
import { Injectable } from "@nestjs/common";
import { HashTable } from "../../../util/src/lib/Interfaces/hashtable-interface";
import { VM } from "../../../util/src/lib/vm.impl";
import { Status } from "./interfaces/status-enum";

@Injectable()
export class VMOrchestrationService implements VMOrchestrationInterface {
    
    private compute;
    private zone;
    private machines: HashTable<VM>;
    private runningMachines: VM[];
    private numOfTotalInstances;

    constructor() {
        this.compute = new Compute();
        this.zone = this.compute.zone('us-central1-c');
        this.numOfTotalInstances = 0;
        this.runningMachines = []
        this.machines = {};
    }

    async createMachine(name: string) {
        try {
            const [vm, operation] = await this.zone.createVM(name, { os: 'ubuntu' });
            this.machines[name] = new VM(name, Status.Running, vm);
            this.runningMachines.push(this.machines[name]);
            this.numOfTotalInstances++;
            console.log(operation)
        } catch (error) {
            console.error(error)
        }
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
