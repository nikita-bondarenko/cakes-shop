import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {Product} from "../../product/models/product.model";
import {DecorationProduct} from "../../decoration/models/decoration-product.model";
import {CreamProduct} from "./cream-prodict.model";

interface CreamCreationAttrs {
    name: string;
    price: number;
}

@Table({tableName: 'creams'})
export class Cream extends Model<Cream, CreamCreationAttrs> {
    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    name: string;

    @Column({type: DataType.INTEGER, defaultValue: 0, allowNull: false})
    price: number;

    @BelongsToMany(() => Product, () => CreamProduct)
    products: Product[];
}