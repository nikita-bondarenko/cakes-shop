import {Controller, Get} from '@nestjs/common';
import {CategoryService} from "../category/category.service";
import {CakeService} from "./cake.service";

@Controller('/cakes')
export class CakeController {

    constructor(private cakeService: CakeService) {
    }

    @Get()
    getAll() {
        return this.cakeService.getAll()
    }
}
