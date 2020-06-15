import { Status } from "./status-enum"

export interface VMInterface {
    describe(): String;
    getStatus(): Status;
    getTotalRunTimeinMs(): number;
    getInstance(): any;
}
  