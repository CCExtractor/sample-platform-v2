import { VMInterface } from "./interfaces/vm-interface";
import { Status } from "./interfaces/status-enum";
import { performance } from 'perf_hooks';

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
