import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
interface TypeCreationAttrs {
    value: string;
    description: string;
}

@Table({tableName: 'types',  createdAt: false, updatedAt: false})
export class Type extends Model<Type, TypeCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({type: DataType.STRING})
    value: string;
    @Column({type: DataType.STRING})
    description: string;


}