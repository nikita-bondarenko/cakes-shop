import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {User} from "../../user/models/user.model";
import {RoleUser} from "./role-user.model";

interface RoleCreationAttrs {
    value: string;
    description: string;
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string;
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    description: string;
    @BelongsToMany(() => User, () => RoleUser)
    users: User[]

}