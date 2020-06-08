import { Status } from "../../../../orchestration/src/lib/interfaces/status-enum"

export interface VMInterface {
    //TODO: Add more methods. Maybe we should parse desc and
    //        store the info about the machine inside of variables
    describe(): String;
    getStatus(): Status;
    getTotalRunTime(): number  
}
  