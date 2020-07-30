import { Injectable } from '@nestjs/common';
import { DatabaseConnectionService } from '../../../../database/src/lib/services/connection.service'

@Injectable()
export class Compute {

  constructor(private database: DatabaseConnectionService) { }
  
  get() {
    
  }

}
