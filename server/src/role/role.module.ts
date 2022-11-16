import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Role} from "./models/role.model";
import {RoleUser} from "./models/role-user.model";
import {User} from "../user/models/user.model";

@Module({
  providers: [RoleService],
  controllers: [RoleController],
  imports: [SequelizeModule.forFeature([User, Role, RoleUser])],
  exports: [RoleService]

})
export class RoleModule {}
