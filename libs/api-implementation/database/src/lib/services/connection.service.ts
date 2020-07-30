
import { Injectable } from '@nestjs/common';
import * as Mongoose from "mongoose";

import { connect, disconnect } from '../util/connection.util'

@Injectable()
export class DatabaseConnectionService {

  readonly db: Mongoose.Connection

  constructor() {
    this.db = connect()
  }

  disconnectDB() {
    disconnect()
  }
}


