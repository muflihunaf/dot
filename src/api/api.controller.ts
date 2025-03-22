/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { ApiService } from './api.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('posts')
@UseInterceptors(CacheInterceptor)
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get()
  async getPosts() {
    return this.apiService.getPosts();
  }

  @Get(':id')
  async getPost(@Param('id') id: number) {
    return this.apiService.getPost(id);
  }

  @Post()
  async createPost(@Body() postData: CreatePostDto) {
    return this.apiService.createPost(postData);
  }

  @Put(':id')
  async updatePost(@Param('id') id: number, @Body() postData: UpdatePostDto) {
    return this.apiService.updatePost(id, postData);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: number) {
    return this.apiService.deletePost(id);
  }
}
