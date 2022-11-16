import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Product} from "../product/models/product.model";

interface PictureCreationAttrs {
    productId: number;
    value: string;
    main: boolean;
}

@Table({tableName: 'pictures'})
export class Picture extends Model<Picture, PictureCreationAttrs> {
    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
    id: number;
    @ForeignKey(() => Product)
    @Column({type: DataType.INTEGER, allowNull: false})
    productId: number;
    @Column({type: DataType.STRING, allowNull: true})
    value: string;
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    main: boolean;
}