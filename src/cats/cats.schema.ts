import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, SchemaOptions} from 'mongoose';
import {IsEmail, IsNotEmpty, IsString} from "class-validator";

const options:SchemaOptions = {
    timestamps: true,
}

@Schema(options)
export class Cat extends Document {

    @Prop({
            required: true,
            unique: true,
        }
    )
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Prop({required: true})
    @IsString()
    @IsNotEmpty()
    name: string;

    @Prop({
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    password: string;

    @Prop({
        default:
            'https://raw.githubusercontent.com/amamov/teaching-nestjs-a-to-z/main/images/1.jpeg',
        }
    )
    @IsString()
    imgUrl: string;

    readonly readOnlyData: { id: string, email: string, name: string, imgUrl: string; };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

CatSchema.virtual('readOnlyData').get(function (this: Cat) {
    return {
        id: this.id,
        email: this.email,
        name: this.name,
        imgUrl: this.imgUrl,
    };
});