import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {Product} from "../../product/models/product.model";
import {SizeProduct} from "./size-product.model";

interface SizeCreationAttrs {
    name: string;
    price: number;
}

@Table({tableName: 'sizes'})
export class Size extends Model<Size, SizeCreationAttrs> {
    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    name: string;

    @Column({type: DataType.INTEGER, defaultValue: 0, allowNull: false})
    price: number;

    @BelongsToMany(() => Product, () => SizeProduct)
    products: Product[];
}