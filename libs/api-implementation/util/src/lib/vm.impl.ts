import { VMInterface } from "./Interfaces/vm-interface";
import { Status } from "../../../orchestration/src/lib/interfaces/status-enum";

export class VM implements VMInterface {

  private name: string;
  private status: Status;
  private startTime: number;
  private instance: any;

  constructor(name: string, status: Status, instance: any) {
    this.name = name;
    this.status = status;
    this.startTime = performance.now();
  }

  describe(): string {
    //TODO: add more informative response
    return this.name;
  }
  getStatus(): Status {
    return this.status;
  }
  getTotalRunTimeinMs(): number {
    return performance.now() - this.startTime;
  }

  getInstance(): any{
    return this.instance;
  }
}
