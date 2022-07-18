import {BadRequestException, Injectable} from '@nestjs/common';
import {CommentsCreateDto} from "../dtos/comments.create.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Comments} from "../comments.schema";
import {CatsRepository} from "../../cats/cats.repository";

@Injectable()
export class CommentsService {

    constructor(@InjectModel(Comments.name) private readonly commentsModel: Model<Comments>,
                private readonly catsRepository: CatsRepository) {
    }

    async getAllComments() {
        try {
            return await this.commentsModel.find();
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }


    async createComment(id: string, commentsData: CommentsCreateDto) {
        try {
            const targetCat = await this.catsRepository.findCatByIdWithoutPassword(id);
            const {contents, author} = commentsData;
            const validatedAuthor =
                await this.catsRepository.findCatByIdWithoutPassword(author);
            const newComments = new this.commentsModel(
                {
                    author: validatedAuthor._id,
                    contents,
                    info: targetCat._id
                }
            );
            return await newComments.save();
        } catch (error){
            throw new BadRequestException(error.message);
        }
    }

    async plusLike(id: string) {
        try {
            const comment = await this.commentsModel.findById(id);
            comment.likeCount += 1;
            return await comment.save();
        }catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
