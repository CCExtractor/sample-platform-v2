import { VMOrchestrationInterface } from "./interfaces/vm-orchestration-interface"
import { VMInterface } from "../../../util/src/lib/Interfaces/vm-interface";
import Compute from "@google-cloud/compute"
import { Injectable } from "@nestjs/common";

@Injectable()
export class VMOrchestrationService implements VMOrchestrationInterface {
    private compute;
    private zone;
    private machines: any [];
    

    constructor() {
        this.compute = new Compute();
        this.zone = this.compute.zone('us-central1-c');
    }

    async createMachine(name: String) {
        const [vm, operation] = await this.zone.createVM(name, { os: 'ubuntu' });
        this.machines.push([vm, operation])
    }

    reset(): void {
        throw new Error("Method not implemented.");
    }

    start(): void {
        throw new Error("Method not implemented.");
    }
    stop(): void {
        throw new Error("Method not implemented.");
    }
    killMachine(): void {
        throw new Error("Method not implemented.");
    }
    getNumberOfRunningInstances(): number {
        throw new Error("Method not implemented.");
    }
    getNumberOfTotalInstances(): number {
        throw new Error("Method not implemented.");
    }
    getRunningInstances(): VMInterface[] {
        throw new Error("Method not implemented.");
    }
    getAllInstances(): VMInterface[] {
        throw new Error("Method not implemented.");
    }
    
}






