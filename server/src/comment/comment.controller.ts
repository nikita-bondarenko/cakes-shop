import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {CommentService} from "./comment.service";
import {CreateCommentDto} from "./dto/CreateCommentDto";
import {UpdateCommentDto} from "./dto/UpdateCommentDto";

@Controller('comments')
export class CommentController {
    constructor(private commentService: CommentService) {
    }

    @Get('/:id')
    getByProductId(@Param('id') id: number,
                   @Query('offset') offset: number,
                   @Query("limit") limit: number,
    ) {
        return this.commentService.getByProductId(id, offset, limit)
    }

    @Post()
    create(@Body() dto: CreateCommentDto) {
        return this.commentService.create(dto)
    }

    @Put('/:id')
    update(@Param('id') id: number, @Body() dto: UpdateCommentDto) {
        return this.commentService.update(id, dto)
    }

    @Delete('/:id')
    delete(@Param('id') id: number) {
        return this.commentService.delete(id)
    }
}
