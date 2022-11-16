import { Module } from '@nestjs/common';
import { GlobalCommentService } from './global-comment.service';
import { GlobalCommentController } from './global-comment.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../user/models/user.model";
import {GlobalCommentModel} from "./models/global-comment.model";

@Module({
  providers: [GlobalCommentService],
  controllers: [GlobalCommentController],
  imports: [SequelizeModule.forFeature([User, GlobalCommentModel])],
  exports: [GlobalCommentService]
})
export class GlobalCommentModule {}
