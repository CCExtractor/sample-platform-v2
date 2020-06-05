import { VMOrchestrationInterface } from "../../../../api-interfaces/src/lib/vm-orchestration-interface"
import { VMInterface } from "../../../../api-interfaces/src/lib/vm-interface";
import Compute from "@google-cloud/compute"

export class VMOrchestration implements VMOrchestrationInterface {
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






