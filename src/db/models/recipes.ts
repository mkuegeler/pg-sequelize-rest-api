// template Model
import { Model, DataTypes } from "sequelize";
import sequelize from ".";

export class Recipes extends Model {
    public uid!: string;
    public name!: string;
    public type!: string;
    public doc: any
}

Recipes.init(
    {

        uid: {
            type: new DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
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