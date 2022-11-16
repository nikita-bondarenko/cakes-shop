import { Injectable } from '@nestjs/common';
import {CreateCategoryDto} from "../category/dto/CreateCategoryDto";
import {Category} from "../category/models/category.model";
import {copy} from "../category/category.service";
import {InjectModel} from "@nestjs/sequelize";
import {CommentModel} from "./models/comment.model";
import {CreateCommentDto} from "./dto/CreateCommentDto";
import {UpdateCommentDto} from "./dto/UpdateCommentDto";

@Injectable()
export class CommentService {
constructor(@InjectModel(CommentModel) private commentRepository: typeof CommentModel) {
}

async getOne(id: number) : Promise<CommentModel> {
    return await this.commentRepository.findOne({where: {id}, include: {all: true}})
}

async getByProductId(id: number, offset: number = 0, limit: number = 5)  {
  const {rows: items, count} = await this.commentRepository.findAndCountAll({where: {productId: id}, include: {all: true}, offset, limit, order: [["createdAt", "DESC"]]})

    return {
        items,
        pagination: {
            count,
            limit,
            offset
        }
    }
}

async create(dto: CreateCommentDto) {
   const comment = await this.commentRepository.create(dto)
    return this.getOne(comment.id)
}

async update(id: number,  dto: UpdateCommentDto) {
    const comment = await this.getOne(id)
    await comment.update({text: dto.text})
    return comment
}

async delete(id: number) {
    const comment =  await this.getOne(id)
    await comment.destroy()
}

}
