import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../../user/models/user.model";
import {Role} from "./role.model";

@Table({tableName: 'role_user', createdAt: false, updatedAt: false})
export class RoleUser extends Model<RoleUser> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER})
    roleId: number;

    @BelongsTo(() => Role)
    role: Role;
}