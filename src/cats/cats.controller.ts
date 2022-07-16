import {Body, Controller, Get, Patch, Post, Put, Req, UseGuards} from '@nestjs/common';
import { CatsService } from './cats.service';
import {CatsRequestDto} from "./dto/cats.request.dto";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {ReadOnlyCatDto} from "./dto/cat.dto";
import {AuthService} from "../auth/auth.service";
import {LoginRequestDto} from "../auth/dto/login.request.dto";
import {JwtAuthGuard} from "../auth/jwt/jwt.guard";
import {Request} from "express";
import {CurrentUser} from "../common/decorators/users.decorators";

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
