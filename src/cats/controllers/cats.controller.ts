import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Put,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { CatsService } from '../services/cats.service';
import {CatsRequestDto} from "../dtos/cats.request.dto";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {ReadOnlyCatDto} from "../dtos/cat.dto";
import {AuthService} from "../../auth/auth.service";
import {LoginRequestDto} from "../../auth/dto/login.request.dto";
import {JwtAuthGuard} from "../../auth/jwt/jwt.guard";
import {Request} from "express";
import {CurrentUser} from "../../common/decorators/users.decorators";
import {FileInterceptor, FilesInterceptor} from "@nestjs/platform-express";
import {multerOptions} from "../../common/utils/multer.options";
import {Cat} from "../cats.schema";

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService,
              private readonly authService: AuthService) {
  }

  @ApiOperation({summary: '현재 고양이 가져오기'})
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(@CurrentUser() cat) {
    return cat.readOnlyData;
  }

  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @ApiResponse({
    status: 200,
    description: '성공!',
    type: ReadOnlyCatDto,
  })
  @ApiOperation({summary: '회원가입'})
  @Post()
  async signUp(@Body() body: CatsRequestDto) {
    return await this.catsService.signUp(body);
  }

  @ApiOperation({summary: '로그인'})
  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogIn(data);
  }

/*  @ApiOperation({summary: '로그아웃'})
  @Post('logout')
  logOut() {
    return 'logout';
  }*/

  @ApiOperation({summary: '고양이 이미지 업로드'})
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('cats')))
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  uploadCatImg(@UploadedFiles() files: Array<Express.Multer.File>, @CurrentUser() cat: Cat) {
    console.log(files);
    // return 'uploadImg';
    // return {image: `http://localhost:8000/media/cats/${files[0].filename}`}
    return this.catsService.uploadImg(cat, files);
  }

  @ApiOperation({summary: '모든 고양이 가져오기'})
  @Get('all')
  getAllCat() {
    console.log(this.catsService.getAllCat());
    return this.catsService.getAllCat();
  }
}
