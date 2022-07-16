import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Cat} from "./cats.schema";
import {Model} from "mongoose";
import {CatsRequestDto} from "./dto/cats.request.dto";

@Injectable()
export class CatsRepository {
    constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {
    }

    async existByEmail(email: string): Promise<boolean> {

        const result = await this.catModel.exists({email});
        return !!result;
    }

    async create(cat: CatsRequestDto): Promise<Cat> {
        return await this.catModel.create(cat);
    }

    async findCatByEmail(email: string): Promise<Cat | null> {
        return this.catModel.findOne({email});
    }

    async findCatByIdWithoutPassword(catId: string): Promise<CatsRequestDto | null> {
        return this.catModel.findById(catId).select('-password');
    }
}