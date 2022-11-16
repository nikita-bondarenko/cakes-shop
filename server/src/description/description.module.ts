import { Module } from '@nestjs/common';
import { DescriptionService } from './description.service';
import { DescriptionController } from './description.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Description} from "./models/description.model";
import {Product} from "../product/models/product.model";

@Module({
  providers: [DescriptionService],
  controllers: [DescriptionController],
  imports: [SequelizeModule.forFeature([Description, Product])],
exports: [DescriptionService]
})
export class DescriptionModule {}
