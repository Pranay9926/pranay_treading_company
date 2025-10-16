import { Sequelize } from "sequelize";
import { GetUserModule } from "./userModel";
import { GetProductModel } from "./productModel";

export function initModel(sequelize: Sequelize) {
  GetUserModule(sequelize);
  GetProductModel(sequelize);
}