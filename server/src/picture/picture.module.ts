import { Module } from '@nestjs/common';
import { PictureController } from './picture.controller';
import { PictureService } from './picture.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Product} from "../product/models/product.model";
import {Picture} from "./picture.model";
import {FileModule} from "../file/file.module";

@Module({
  controllers: [PictureController],
  providers: [PictureService],
  imports: [SequelizeModule.forFeature([Product, Picture]), FileModule],
  exports: [PictureService]
})
export class PictureModule {}
