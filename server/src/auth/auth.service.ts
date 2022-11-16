import {Body, HttpException, HttpStatus, Injectable, Post, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import {UserService} from "../user/user.service";
import {CreateUserDto} from "../user/dto/CreateUserDto";
import {User} from "../user/models/user.model";
import {MailService} from "../mail/mail.service";
import {UpdateUserDto} from "../user/dto/UpdateUserDto";
import {FileService} from "../file/file.service";

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService, private mailService: MailService, private fileService: FileService) {

    }

   async loginByEmail(email: string) : Promise<{ token: string }> {
        const user = await this.userService.getUserByEmail(email)
       return this.generateToken(user)
   }

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    private async changeUserData(dto, method: string) {

        let user

        if (dto.password) {
            const hashPassword = await bcrypt.hash(dto.password, 5)
            user = await this.userService[method]({...dto, password: hashPassword})
            if (method === 'create') {
               await this.mailService.sendUserData(dto.email, dto.password)
            }

        } else {
            user = await this.userService[method](dto)
        }
        return this.generateToken(user)
    }

    async registration(userDto: CreateUserDto) {

        return this.changeUserData(userDto, 'create')
    }

    async updateUserData(userDto: UpdateUserDto, picture = null) {
        const user = await this.userService.getOne(userDto.id)

        if (picture) {
            const fileName = await this.fileService.createFile(picture)
            userDto.picture = fileName
            user.picture && await this.fileService.deleteFile(user.picture)
        }
        return this.changeUserData(userDto, 'update')
    }

    private async generateToken(user: User) {
        const payload = {email: user.email, name: user.name, picture: user.picture ,  id: user.id, roles: user.roles, activeCart: user.activeCart}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email)
        const passwordEquals = await bcrypt.compare(userDto.password, user.password)
        if (user && passwordEquals) {
            return user
        }
        throw new UnauthorizedException({message: "Некорректный email или пароль"})
    }

    async updateJWT(token) {
        const user = await this.jwtService.verify(token)
        return this.generateToken(user)
    }

    async confirm(email: string, token: string) {
        await this.mailService.sendUserConfirmation(email, token)
    }
}
