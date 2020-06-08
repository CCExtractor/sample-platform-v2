import { VMInterface } from "./Interfaces/vm-interface";
import { Status } from "../../../orchestration/src/lib/interfaces/status-enum";
import { Injectable } from "@nestjs/common"

@Injectable()
export class VMService implements VMInterface {
  describe(): String {
    throw new Error("Method not implemented.");
  }
  getStatus(): Status {
    throw new Error("Method not implemented.");
  }
  getTotalRunTime(): number {
    throw new Error("Method not implemented.");
  }
}