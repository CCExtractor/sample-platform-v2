import { model } from "mongoose";
import { IRegressionTestDocument } from "./regression-test.types";
import RegressionTestSchema from "./regression-test.schema";
export const RegressionTestModel:model  = model<IRegressionTestDocument>("regression-test", RegressionTestSchema);
