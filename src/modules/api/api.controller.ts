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
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('posts')
@UseInterceptors(CacheInterceptor)
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({ status: 200, description: 'Return all posts' })
  async getPosts() {
    return this.apiService.getPosts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a post by id' })
  @ApiResponse({ status: 200, description: 'Return a post by id' })
  async getPost(@Param('id') id: number) {
    return this.apiService.getPost(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a post' })
  @ApiBody({ type: CreatePostDto })
  @ApiResponse({ status: 201, description: 'Return the created post' })
  async createPost(@Body() postData: CreatePostDto) {
    return this.apiService.createPost(postData);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a post' })
  @ApiResponse({ status: 200, description: 'Return the updated post' })
  async updatePost(@Param('id') id: number, @Body() postData: UpdatePostDto) {
    return this.apiService.updatePost(id, postData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post' })
  @ApiResponse({ status: 200, description: 'Return the deleted post' })
  async deletePost(@Param('id') id: number) {
    return this.apiService.deletePost(id);
  }
}
