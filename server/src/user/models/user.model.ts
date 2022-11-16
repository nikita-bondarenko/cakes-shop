import {BelongsToMany, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table} from 'sequelize-typescript'
import {Role} from "../../role/models/role.model";
import {RoleUser} from "../../role/models/role-user.model";
import {Order} from "../../order/models/order.model";
import {Cart} from "../../cart/models/cart.model";
import {CommentModel} from "../../comment/models/comment.model";
import {GlobalCommentModel} from "../../global-comment/models/global-comment.model";

interface UserCreationAttrs {
    email: string;
    password: string;
    picture: string;
    cartId: number;
    roles: Role[];
    comments: CommentModel[];
    banned: boolean;
    banReason: string;
    name: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;
    @Column({type: DataType.STRING})
    password: string;
    @Column({type: DataType.STRING})
    picture: string;
    @Column({type: DataType.STRING})
    name: string;
    @BelongsToMany(() => Role, () => RoleUser)
    roles: Role[];

    @HasMany(() => GlobalCommentModel)
    globalComments: GlobalCommentModel[];

    @HasMany(() => CommentModel)
    comments: CommentModel[];

    @HasMany(() => Order)
    orders: Order[];

    @ForeignKey(() => Cart)
    @Column({type: DataType.INTEGER})
    cartId: number;

    @HasOne(() => Cart)
    activeCart: Cart

    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;

}

