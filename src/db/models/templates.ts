// template Model
import { Model, DataTypes } from "sequelize";
import sequelize from ".";

export class Templates extends Model {
    public name!: string;
    public type!: string;
    public doc: any
}

Templates.init(
    {

        name: {
            type: new DataTypes.STRING(50),
            allowNull: false,
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
        tableName: "Templates",
        sequelize, // passing the `sequelize` instance is required
    }
);