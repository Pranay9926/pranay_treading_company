import { Model, DataTypes, Sequelize } from 'sequelize';
// import { sequelize } from '../config/dbconfig';

export class UsersModel extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
}

export function GetUserModule(sequelize: Sequelize) {
  UsersModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
}