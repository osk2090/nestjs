import {Body, Controller, Delete, Get, Patch, Post, Put} from '@nestjs/common';
import { CatsService } from './cats.service';
import {CatsRequestDto} from "./dto/cats.request.dto";

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  @Post()
  async signUp(@Body() body: CatsRequestDto) {
    return await this.catsService.signUp(body);
  }

  @Post('logout')
  logOut() {
    return 'logout';
  }

  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg';
  }
}
