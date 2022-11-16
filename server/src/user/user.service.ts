import {Body, Delete, Get, Injectable, Param, Post, Put, Query, UploadedFile, UseInterceptors} from '@nestjs/common';
import {User} from "./models/user.model";
import {FileInterceptor} from "@nestjs/platform-express";
import {CreateUserDto} from "./dto/CreateUserDto";
import {InjectModel} from "@nestjs/sequelize";
import * as bcrypt from 'bcryptjs'
import {Op} from "sequelize";
import {FileService} from "../file/file.service";
import {RoleService} from "../role/role.service";
import {CartService} from "../cart/cart.service";
import {UpdateUserDto} from "./dto/UpdateUserDto";
import {GlobalCommentService} from "../global-comment/global-comment.service";
import {Role} from "../role/models/role.model";

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userRepository: typeof User,
                private fileService: FileService,
                private roleService: RoleService,
                private cartService: CartService,
                private globalCommentService: GlobalCommentService
    ) {
    }

    async getAll(offset: number = 0, limit: number = 10): Promise<{ items: User[], pagination: { count: number, limit: number, offset: number } }> {
        const {rows, count} = await this.userRepository.findAndCountAll({
            include: {all: true},
            offset: offset,
            limit: limit,
            order: [['email', 'ASC']]
        })
        return {
            items: rows,
            pagination: {
                count,
                limit,
                offset
            }
        }
    }

    async search(query: string = '', offset: number = 0, limit: number = 10): Promise<{ items: User[], pagination: { count: number, limit: number, offset: number } }> {
        const {rows, count} = await this.userRepository.findAndCountAll({
            where: {
                email: {[Op.iLike]: `%${query}%`}
            },
            include: {all: true},
            order: [['name', 'ASC']]
        })
        return {
            items: rows,
            pagination: {
                count,
                limit,
                offset
            }
        }
    }

    async getOne(id: number) {
        const user = await this.userRepository.findOne({where: {id}, include: {all: true}})
        return user
    }


    async create(dto: CreateUserDto, picture = null) {
        if (picture) {
            const fileName = await this.fileService.createFile(picture)
            dto.picture = fileName
        }
        const role = await this.roleService.getByValue('USER')
        const user = await this.userRepository.create(dto,)
        const cart = await this.cartService.create(user.id)
        await user.$set('activeCart', cart.id)
        // await user.$set('roles', [role.id])
        const newUser = await this.getOne(user.id)
        return newUser
    }

    async update(dto: UpdateUserDto) {
        const user = await this.getOne(dto.id)
        if (!!dto.picture && !!user.picture && user.picture !== dto.picture) await this.fileService.deleteFile(user.picture)
        if(dto.password) {
            const hashedPassword = await bcrypt.hash(dto.password, 5)
            dto.password = hashedPassword
        }
        await user.update(dto)
        return user
    }

    async finishUpdate(id: number, dto) {

    }

    async delete(id: number) {
        const user = await this.getOne(id)
        await user.destroy()
    }

    async ban(id: number, banReason: string, value: boolean) {
        const user = await this.getOne(id)
        await user.update({banned: value, banReason})
    }


    async setRole(id: number, ids: number[]) {
        const user = await this.getOne(id)
        await user.$set('roles', ids)
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}})
        return user
    }

    async isEmailUnique(email: string, id?: number) {
        const user = await this.userRepository.findOne({where: {email}})
        return !user || (user && user.id == id)
    }

    async findAdmins() {
        return this.userRepository.findAll({include:{model: Role, where: {value: "ADMIN"}}})
    }
}
