// template Model
import { Model, DataTypes } from "sequelize";
import sequelize from ".";

export class Recipes extends Model {
    public name!: string;
    public doc: any
}

Recipes.init(
    {

        name: {
            type: new DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        type: {
            type: new DataTypes.STRING(50),
            allowNull: true,
        },
        doc: {
            type: DataTypes.JSON,
            allowNull: true,
        }
    },
    {
        tableName: "Recipes",
        sequelize, // passing the `sequelize` instance is required
    }
);