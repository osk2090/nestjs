import {HttpException, Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Cat} from "./cats.schema";
import * as bcrypt from 'bcrypt';
import {Model} from "mongoose";
import {CatsRequestDto} from "./dto/cats.request.dto";

@Injectable()
export class CatsService {
    constructor(@InjectModel(Cat.name) private readonly catModule: Model<Cat>) {

    }

    async signUp(body: CatsRequestDto) {
        const {email, name, password} = body;
        const isCatExist = await this.catModule.exists({email});

        if (isCatExist) {
            throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const cat = await this.catModule.create({email, password: hashedPassword, name});


        return cat.readOnlyData;
    }
}