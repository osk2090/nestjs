import {forwardRef, Module} from '@nestjs/common';
import { CatsController } from './controllers/cats.controller';
import { CatsService } from './services/cats.service';
import {Mongoose} from "mongoose";
import {MongooseModule} from "@nestjs/mongoose";
import {Cat, _CatSchema, CatSchema} from "./cats.schema";
import {CatsRepository} from "./cats.repository";
import {AuthModule} from "../auth/auth.module";
import {MulterModule} from "@nestjs/platform-express";
import {Comments, CommentsSchema} from "../comments/comments.schema";

@Module({
    imports: [
        MulterModule.register({dest: './upload'})
        , MongooseModule.forFeature([
            {name: Comments.name, schema: CommentsSchema},
            {name: Cat.name, schema: CatSchema}
        ]),
        forwardRef(() => AuthModule)
    ],

  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsService, CatsRepository],
})
export class CatsModule {}
