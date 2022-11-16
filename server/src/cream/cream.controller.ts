import {Controller, Get} from '@nestjs/common';
import {CreamService} from "./cream.service";

@Controller('creams')
export class CreamController {

    constructor(private creamService: CreamService) {
    }

    @Get()
    getAll() {
        return this.creamService.getAll()
    }
}
