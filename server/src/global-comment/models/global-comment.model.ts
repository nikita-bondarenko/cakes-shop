import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../../user/models/user.model";

interface CreationGlobalCommentAttrs {
    userId: number;
    text: string;
}

@Table({tableName: 'global_comments'})
export class GlobalCommentModel extends Model<GlobalCommentModel, CreationGlobalCommentAttrs> {
    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number;

    @BelongsTo(() => User)
    user: User

    @Column({type: DataType.STRING, allowNull: false, defaultValue: ''})
    text: string;
}