import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as path from "path";
import * as uuid from "uuid";
import * as fs from "fs/promises";
import {existsSync} from 'fs'

@Injectable()
export class FileService {
    private filePath = path.resolve(__dirname, '..', 'static')

    async createFile(file): Promise<string> {
        try {
            const fileExtension = file.originalname.split('.').pop()
            const fileName = uuid.v4() + '.' + fileExtension
            if (!existsSync(this.filePath)) {
                await fs.mkdir(this.filePath, {recursive: true})
            }
            await fs.writeFile(path.join(this.filePath, fileName), file.buffer)
            return fileName
        } catch (e) {
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteFile(fileName): Promise<void> {
        try {
            if (!existsSync(path.join(this.filePath, fileName)) || !fileName) return
            await fs.unlink(path.join(this.filePath, fileName))
        } catch (e) {
            throw new HttpException('Произошла ошибка при удалении файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
