import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Property} from "./property.model";
import {Product} from "../../product/models/product.model";

@Table({tableName: 'property_product', createdAt: false, updatedAt: false})
export class PropertyProduct extends Model<PropertyProduct> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Product)
    @Column({type: DataType.INTEGER})
    productId: number;

    @ForeignKey(() => Property)
    @Column({type: DataType.INTEGER})
    propertyId: number;
}