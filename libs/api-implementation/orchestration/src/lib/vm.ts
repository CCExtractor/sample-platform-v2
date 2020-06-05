import { VMInterface } from "../../../../api-interfaces/src/lib/vm-interface";
import { Status } from "../../../../api-interfaces/src/lib/status-enum";

export class VM implements VMInterface {
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