/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import axios from 'axios';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
@Injectable()
export class ApiService {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async getPosts() {
    const response = await axios.get<Post[]>(this.apiUrl);
    return response.data;
  }

  async getPost(id: number) {
    const response = await axios.get<Post>(`${this.apiUrl}/${id}`);
    return response.data;
  }

  async createPost(post: CreatePostDto) {
    try {
      const response = await axios.post<Post>(this.apiUrl, post);

      const createdPost = this.postRepository.create(response.data);
      return await this.postRepository.save(createdPost);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to create post',
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updatePost(id: number, post: UpdatePostDto) {
    try {
      const response = await axios.put<Post>(`${this.apiUrl}/${id}`, post);
      const data = await this.postRepository.findOne({ where: { id } });
      if (!data) {
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
      }
      // update the post
      await this.postRepository.update(id, response.data);
      return response.data;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to update post',
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deletePost(id: number) {
    try {
      const response = await axios.delete<Post>(`${this.apiUrl}/${id}`);
      const data = await this.postRepository.findOne({ where: { id } });
      if (!data) {
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
      }
      // delete the post
      await this.postRepository.delete(id);
      return response.data;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to delete post',
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
