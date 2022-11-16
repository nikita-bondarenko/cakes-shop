import {Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {PictureService} from "./picture.service";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('pictures')
export class PictureController {
    constructor(private pictureService: PictureService) {
    }
}
