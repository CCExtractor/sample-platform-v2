import * as Mongoose from "mongoose";
import { AppConfig } from '../../../../../../config'

let database: Mongoose.Connection;
export const connect = () => {
  const uri = `${AppConfig.MONGO_CONNECTION_STRING}`;
  if (database) {
    return;
  }
  Mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  database = Mongoose.connection;
  
  database.once("open", async () => {
    console.log("Connected to database");
  });
  database.on("error", (err) => {
    console.log("Error connecting to database");
    // tslint:disable-next-line: no-console
    console.debug(err.stack)
  });
};

export const disconnect = () => {
  if (!database) {
    return;
  }
  Mongoose.disconnect();
};