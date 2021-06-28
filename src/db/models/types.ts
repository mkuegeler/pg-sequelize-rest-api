// template Model
import { Model, DataTypes } from "sequelize";
import sequelize from ".";

export class Types extends Model {
    public name!: string;
    public type!: string;
    public doc: any
}

Types.init(
    {

        name: {
            type: new DataTypes.STRING(50),
            allowNull: false,
            unique: true
        }
    },
    {
        tableName: "Types",
        sequelize, // passing the `sequelize` instance is required
    }
);