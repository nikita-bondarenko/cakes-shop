import {Controller, Get, Param} from '@nestjs/common';
import {NuanceService} from "./nuance.service";
import {CreamService} from "../cream/cream.service";

@Controller('nuances')
export class NuanceController {
    constructor(private nuanceService: NuanceService) {
    }

    @Get()
    getAll() {
        return this.nuanceService.getAll()
    }
}
