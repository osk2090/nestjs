import {Body, Controller, Delete, Get, Patch, Post, Put} from '@nestjs/common';
import { CatsService } from './cats.service';
import {CatsRequestDto} from "./dto/cats.request.dto";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {ReadOnlyCatDto} from "./dto/cat.dto";

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @ApiOperation({summary: '현재 고양이 가져오기'})
  @Get()
  getCurrentCat() {
    return 'current cat';
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
  logIn() {
    return 'logout';
  }

  @ApiOperation({summary: '로그아웃'})
  @Post('logout')
  logOut() {
    return 'logout';
  }

  @ApiOperation({summary: '고양이 이미지 업로드'})
  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg';
  }
}
