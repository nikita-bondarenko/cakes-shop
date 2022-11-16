import {Controller, Get} from '@nestjs/common';
import {SizeService} from "./size.service";

@Controller('sizes')
export class SizeController {
    constructor(private sizeService: SizeService) {
    }

    @Get()
    getAll() {
        return this.sizeService.getAll()
    }
}
