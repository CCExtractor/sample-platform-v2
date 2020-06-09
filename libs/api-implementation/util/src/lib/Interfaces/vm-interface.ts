import { Status } from "../../../../orchestration/src/lib/interfaces/status-enum"

export interface VMInterface {
    describe(): String;
    getStatus(): Status;
    getTotalRunTimeinMs(): number;
    getInstance(): any;
}
  