import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {Product} from "../../product/models/product.model";
import {CreamProduct} from "../../cream/models/cream-prodict.model";
import {CakeProduct} from "./cake-product.model";

interface CakeCreationAttrs {
    name: string;
    price: number;
}

@Table({tableName: 'cakes'})
export class Cake extends Model<Cake, CakeCreationAttrs> {
    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;

    @BelongsToMany(() => Product, () => CakeProduct)
    products: Product[];

}