import {forwardRef, Module} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Role} from "../role/models/role.model";
import {RoleUser} from "../role/models/role-user.model";
import {User} from "./models/user.model";
import {Cart} from "../cart/models/cart.model";
import {CommentModel} from "../comment/models/comment.model";
import {Order} from "../order/models/order.model";
import {FileService} from "../file/file.service";
import {RoleModule} from "../role/role.module";
import {AuthModule} from "../auth/auth.module";
import {CartModule} from "../cart/cart.module";
import {GlobalCommentModel} from "../global-comment/models/global-comment.model";
import {GlobalCommentModule} from "../global-comment/global-comment.module";

@Module({
  providers: [UserService, FileService],
  controllers: [UserController],
  imports: [SequelizeModule.forFeature([User, Role, RoleUser, Cart, CommentModel, Order, GlobalCommentModel]), RoleModule, forwardRef(() => AuthModule), CartModule, GlobalCommentModule],
  exports: [UserService]
})
export class UserModule {}
