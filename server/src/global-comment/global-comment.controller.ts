import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {CreateGlobalCommentDto} from "./dto/CreateGlobalCommentDto";
import {UpdateGlobalCommentDto} from "./dto/UpdateGlobalCommentDto";
import {GlobalCommentService} from "./global-comment.service";

@Controller('global_comments')
export class GlobalCommentController {
    constructor(private globalService: GlobalCommentService) {
    }

    @Post()
    create(@Body() dto: CreateGlobalCommentDto) {
        return this.globalService.create(dto)
    }

    @Put('/:id')
    update(@Param('id') id: number, @Body() dto: UpdateGlobalCommentDto) {
        return this.globalService.update(id, dto)
    }

    @Delete('/:id')
    delete(@Param('id') id : number) {
        return this.globalService.delete(id)
    }

    @Get()
    getAll( @Query('offset') offset: number,
            @Query("limit") limit: number,) {
        return this.globalService.getAll(offset, limit)
    }
}
