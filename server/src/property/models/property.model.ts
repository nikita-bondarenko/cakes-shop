import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {Product} from "../../product/models/product.model";
import {PropertyProduct} from "./property-product.model";

interface PropertyCreationAttrs {
    name: string;
    value: string;
}
@Table({tableName: 'properties'})
export class Property extends Model<Property, PropertyCreationAttrs> {
    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true})
    id: number;
    @Column({type: DataType.STRING, unique: false, allowNull: false})
    name: string;
    @Column({type: DataType.STRING})
    value: string;
    @BelongsToMany(() => Product, () => PropertyProduct)
    products: Product[]
}