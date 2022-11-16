import { Module } from '@nestjs/common';
import { SizeController } from './size.controller';
import { SizeService } from './size.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Product} from "../product/models/product.model";
import {Size} from "./models/size.model";

@Module({
  controllers: [SizeController],
  providers: [SizeService],
  imports: [SequelizeModule.forFeature([Product, Size])],
  exports: [SizeService]
})
export class SizeModule {}
