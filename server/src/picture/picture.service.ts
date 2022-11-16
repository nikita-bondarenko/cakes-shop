import { Injectable } from '@nestjs/common';
import {CreateDescriptionDto} from "../description/dto/CreateDescriptionDto";
import {Description} from "../description/models/description.model";
import {InjectModel} from "@nestjs/sequelize";
import {Picture} from "./picture.model";
import {CreatePictureDto} from "./dto/CreatePictureDto";
import {getAllByProductId} from "../product/product.service";
import {FileService} from "../file/file.service";

@Injectable()
export class PictureService {
    constructor(@InjectModel(Picture) private pictureRepository: typeof Picture,
    private fileService: FileService) {

    }
    async createMany(dto: CreatePictureDto[]): Promise<Picture[]> {
        const items = await this.pictureRepository.bulkCreate(dto)
        return items
    }

    async deleteByProductId(id: number) : Promise<void> {
        // const items = await this.pictureRepository.findAll({where: {productId: id}})

        await this.pictureRepository.destroy({
            where: {productId: id}
        })

      // await Promise.all(items.map(item => this.fileService.deleteFile(item.value)))
    }
}
