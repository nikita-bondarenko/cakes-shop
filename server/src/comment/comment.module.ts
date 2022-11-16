import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../user/models/user.model";
import {CommentModel} from "./models/comment.model";
import {Product} from "../product/models/product.model";

@Module({
  providers: [CommentService],
  controllers: [CommentController],
  imports: [SequelizeModule.forFeature([Product, CommentModel, User])],
exports:[CommentService]
})
export class CommentModule {}
