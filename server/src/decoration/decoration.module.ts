import { Module } from '@nestjs/common';
import { DecorationController } from './decoration.controller';
import { DecorationService } from './decoration.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Decoration} from "./models/decoration.model";
import {Product} from "../product/models/product.model";
import {FileService} from "../file/file.service";

@Module({
  controllers: [DecorationController],
  providers: [DecorationService, FileService],
  imports: [SequelizeModule.forFeature([Decoration, Product])],
  exports: [DecorationService]
})
export class DecorationModule {}
