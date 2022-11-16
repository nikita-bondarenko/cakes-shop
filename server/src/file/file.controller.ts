import {Controller, Delete, Param, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileService} from "./file.service";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('/files')
export class FileController {
    constructor(private fileService: FileService) {
    }

    @UseInterceptors(FileInterceptor('picture'))
    @Post()
    createFile(@UploadedFile() file) {
        return this.fileService.createFile(file)
    }

    @Delete('/:picture')
    deleteFile(@Param('picture') picture: string) {
        return this.fileService.deleteFile(picture)
    }


}
