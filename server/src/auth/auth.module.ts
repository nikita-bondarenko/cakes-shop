import {forwardRef, Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {JwtModule} from "@nestjs/jwt";
import {UserModule} from "../user/user.module";
import {UserService} from "../user/user.service";
import {MailModule} from "../mail/mail.module";
import {FileService} from "../file/file.service";

@Module({
  providers: [AuthService, FileService],
  controllers: [AuthController],
  imports: [forwardRef(() => UserModule), JwtModule.register({secret: process.env.PRIVATE_KEY || 'SECRET', signOptions: {expiresIn: '24h'}} ), MailModule],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
