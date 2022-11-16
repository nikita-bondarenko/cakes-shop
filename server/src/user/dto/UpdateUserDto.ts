import {GlobalCommentModel} from "../../global-comment/models/global-comment.model";

export class UpdateUserDto {
    id: number;
    name?: string;
    email?: string;
    password?: string;
    picture?: string;
}