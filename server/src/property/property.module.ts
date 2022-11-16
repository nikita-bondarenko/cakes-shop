import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Product} from "../product/models/product.model";
import {Property} from "./models/property.model";

@Module({
  providers: [PropertyService],
  controllers: [PropertyController],
  imports:[SequelizeModule.forFeature([Product, Property])],
  exports: [PropertyService]
})
export class PropertyModule {}
