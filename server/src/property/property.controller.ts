import {Controller, Get} from '@nestjs/common';
import {PropertyService} from "./property.service";

@Controller('properties')
export class PropertyController {
    constructor(private propertyService: PropertyService) {
    }

    @Get()
    getAll() {
        return this.propertyService.getAll()
    }
}
