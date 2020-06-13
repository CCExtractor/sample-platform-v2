import * as CloudCompute from "@google-cloud/compute";
import { Injectable } from '@nestjs/common';

@Injectable()
export class Compute {
  private readonly compute: any;
  
  constructor() {
    this.compute = new CloudCompute;
  }

  zone() {
    return this.compute.zone()
  }    
}
