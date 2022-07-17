import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Cat} from "./cats.schema";
import {Model, Schema, Types} from "mongoose";
import {CatsRequestDto} from "./dtos/cats.request.dto";

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

    async findCatByIdWithoutPassword(catId: string | Types.ObjectId): Promise<Cat | null> {
        return this.catModel.findById(catId).select('-password');
    }

    async findByIdAndUpdateImg(id: string, fileName: string) {
        const cat = await this.catModel.findById(id);
        cat.imgUrl = `http://localhost:8000/media/${fileName}`;
        const newCat = await cat.save();//업데이트후 저장
        console.log(newCat);
        return newCat.readOnlyData;
    }

    async findAll() {
        return this.catModel.find();
    }
}