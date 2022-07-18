import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, SchemaOptions} from 'mongoose';
import {IsEmail, IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Comments} from "../comments/comments.schema";

const options:SchemaOptions = {
    timestamps: true,
}

@Schema(options)
export class Cat extends Document {

    @ApiProperty({
        description: 'email',
        required: true,
    })
    @Prop({
            required: true,
            unique: true,
        }
    )
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'name',
        required: true,
    })
    @Prop({required: true})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'password',
        required: true,
    })
    @Prop({
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        description: 'imgUrl',
        required: true,
    })
    @Prop({
        default:
            'https://raw.githubusercontent.com/amamov/teaching-nestjs-a-to-z/main/images/1.jpeg',
        }
    )
    @IsString()
    imgUrl: string;

    readonly readOnlyData: {
        id: string, email: string, name: string, imgUrl: string;
        comments: Comments[];
    };
    readonly comments: Comments[];
}

export const _CatSchema = SchemaFactory.createForClass(Cat);

_CatSchema.virtual('readOnlyData').get(function (this: Cat) {
    return {
        id: this.id,
        email: this.email,
        name: this.name,
        imgUrl: this.imgUrl,
        comments: this.comments,
    };
});

_CatSchema.virtual('comments',{
    ref: 'comments',
    localField: '_id',
    foreignField: 'info',
})
_CatSchema.set('toObject',{virtuals: true})
_CatSchema.set('toJSON', {virtuals: true});

export const CatSchema = _CatSchema;