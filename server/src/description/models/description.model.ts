import {BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table} from "sequelize-typescript";
import {User} from "../../user/models/user.model";
import {Product} from "../../product/models/product.model";

interface DescriptionCreationAttrs {
    productId: number;
    title: string;
    text: string;
}

@Table({tableName: 'descriptions'})
export class Description extends Model<Description, DescriptionCreationAttrs> {
    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
    id: number;
    @Column({type: DataType.STRING, allowNull: true})
    title: string;
    @Column({type: DataType.STRING, allowNull: true})
    text: string;
    @ForeignKey(() => Product)
    @Column({type: DataType.INTEGER, allowNull: false})
    productId: number;

}