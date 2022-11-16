
import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Category} from "./category.model";
import {Product} from "../../product/models/product.model";

@Table({tableName: 'category_product', createdAt: false, updatedAt: false})
export class CategoryProduct extends Model<CategoryProduct> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Category)
    @Column({type: DataType.INTEGER})
    categoryId: number;

    @ForeignKey(() => Product)
    @Column({type: DataType.INTEGER})
    productId: number;
}