import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {GlobalCommentModel} from "./models/global-comment.model";
import {CreateGlobalCommentDto} from "./dto/CreateGlobalCommentDto";
import {UpdateGlobalCommentDto} from "./dto/UpdateGlobalCommentDto";

@Injectable()
export class GlobalCommentService {
    constructor(@InjectModel(GlobalCommentModel) private globalCommentRepository: typeof GlobalCommentModel) {
    }

    findOrCreateByUserId(id: number): Promise<[GlobalCommentModel, boolean]> {
        return this.globalCommentRepository.findOrCreate({
            where: {
                userId: id
            }
        })
    }

    async getOne(id: number) {
        return this.globalCommentRepository.findOne({where: {id}, include: {all: true}})
}

    async create(dto: CreateGlobalCommentDto) {
        const comment = await this.globalCommentRepository.create({...dto})
        return this.getOne(comment.id)
    }

    async update(id: number, dto: UpdateGlobalCommentDto) {
        const comment = await this.getOne(id)
        await comment.update({text: dto.text})
        return comment
    }

    async delete(id: number) {
        const comment = await this.getOne(id)
        await comment.destroy()
    }

    async getAll(offset: number = 0, limit: number = 5) {
        const {rows: items, count} = await this.globalCommentRepository.findAndCountAll({ include: {all: true}, offset, limit, order: [["createdAt", "DESC"]]})

        return {
            items,
            pagination: {
                count,
                limit,
                offset
            }
        }
    }

}
