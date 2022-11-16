import {Controller, Get, Query} from '@nestjs/common';
import {DecorationService} from "./decoration.service";

@Controller('/decorations')
export class DecorationController {
    constructor(private decorationService: DecorationService) {}

    @Get()
    getAll(@Query('offset') offset: number,
           @Query('limit') limit: number) {
        console.log('Haribol')
        return this.decorationService.getAll(offset, limit)
    }

}
