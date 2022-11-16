import {MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {CreateCommentDto} from "./comment/dto/CreateCommentDto";
import {UpdateCommentDto} from "./comment/dto/UpdateCommentDto";
import {CommentService} from "./comment/comment.service";
import {GlobalCommentService} from "./global-comment/global-comment.service";

@WebSocketGateway()
export class CommentGateway {

    constructor(private commentService: CommentService, private globalCommentService: GlobalCommentService) {
    }

    @WebSocketServer()
    server;

    @SubscribeMessage('new_message')
    async create(@MessageBody() dto: CreateCommentDto): Promise<void> {
        console.log(dto)
        const comment = await this.commentService.create(dto)

        this.server.emit('new_message', comment)
    }

    @SubscribeMessage('update_message')
    async update(@MessageBody() dto: UpdateCommentDto): Promise<void> {
        const comment = await this.commentService.update(dto.id, dto)
        this.server.emit('update_message', comment)
    }

    @SubscribeMessage("delete_message")
    async delete(@MessageBody() id: number) {
        await this.commentService.delete(id)
        this.server.emit("delete_message", id)
    }

    @SubscribeMessage('new_global_message')
    async createGlobal(@MessageBody() dto: CreateCommentDto): Promise<void> {
        const comment = await this.globalCommentService.create(dto)
        this.server.emit('new_global_message', comment)
    }

    @SubscribeMessage('update_global_message')
    async updateGlobal(@MessageBody() dto: UpdateCommentDto): Promise<void> {
        const comment = await this.globalCommentService.update(dto.id, dto)
        this.server.emit('update_global_message', comment)
    }

    @SubscribeMessage("delete_global_message")
    async deleteGlobal(@MessageBody() id: number) {
        await this.globalCommentService.delete(id)
        this.server.emit("delete_global_message", id)
    }




}
