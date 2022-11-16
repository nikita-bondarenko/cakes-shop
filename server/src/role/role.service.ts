import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Role} from "./models/role.model";
import {CreateRoleDto} from "./dto/CreateRoleDto";

@Injectable()
export class RoleService {
    constructor(@InjectModel(Role) private roleRepository: typeof Role) {
    }

    async getById(id) {
        const role = await this.roleRepository.findOne({where: {id}, include: {all: true}})
        return role
    }

    async create(dto: CreateRoleDto) {
        const role = await this.roleRepository.create(dto)
        return role
    }

    async getByValue(value: string) {
        const role = await this.roleRepository.findOne({where: {value}, include: {all: true}})
        return role
    }

    async delete(id) {
        const role = await this.getById(id)
        await role.destroy()
    }

    async update(id, dto: CreateRoleDto): Promise<Role> {
        const role = await this.getById(id)
        await role.update(dto)
        return role
    }
}
