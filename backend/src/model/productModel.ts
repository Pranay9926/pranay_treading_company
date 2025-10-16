import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface ProductAttributes {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  stock: number;
  category?: string | null;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id' | 'description' | 'category'> {}

export class ProductModel extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id!: number;
  public name!: string;
  public description!: string | null;
  public price!: number;
  public stock!: number;
  public category!: string | null;
}

export function GetProductModel(sequelize: Sequelize) {
  ProductModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Product',
      tableName: 'products',
      timestamps: true,
    }
  );
}
