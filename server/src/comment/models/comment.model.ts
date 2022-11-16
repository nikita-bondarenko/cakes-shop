import {BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table} from "sequelize-typescript";
import {User} from "../../user/models/user.model";
import {Product} from "../../product/models/product.model";

interface CommentCreationAttrs {
 userId: number;
 productId: number;
 text: string;
}

@Table({tableName: 'comments'})
export class CommentModel extends Model<CommentModel, CommentCreationAttrs> {
    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
    id: number;
    @Column({type: DataType.STRING, allowNull: false})
    text: string;
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number;
    @BelongsTo(() => User)
    user: User;
    @ForeignKey(() => Product)
    @Column({type: DataType.INTEGER, allowNull: false})
    productId: number;

}