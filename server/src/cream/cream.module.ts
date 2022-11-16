import { Module } from '@nestjs/common';
import { CreamController } from './cream.controller';
import { CreamService } from './cream.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Cream} from "./models/cream.model";
import {Product} from "../product/models/product.model";

@Module({
  controllers: [CreamController],
  providers: [CreamService],
  imports: [SequelizeModule.forFeature([Cream, Product])],
  exports: [CreamService]
})
export class CreamModule {}
