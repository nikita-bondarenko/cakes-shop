
import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Nuance} from "./nuance.model";
import {Product} from "../../product/models/product.model";

@Table({tableName: 'nuance_product', createdAt: false, updatedAt: false})
export class NuanceProduct extends Model<NuanceProduct> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Nuance)
    @Column({type: DataType.INTEGER})
    nuanceId: number;

    @ForeignKey(() => Product)
    @Column({type: DataType.INTEGER})
    productId: number;
}