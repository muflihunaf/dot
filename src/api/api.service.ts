/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
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
    const response = await axios.get(this.apiUrl);
    return response.data;
  }

  async getPost(id: number) {
    const response = await axios.get(`${this.apiUrl}/${id}`);
    return response.data;
  }

  async createPost(post: CreatePostDto) {
    const response = await axios.post(this.apiUrl, post);
    return this.postRepository.save(response.data);
  }

  async updatePost(id: number, post: UpdatePostDto) {
    const response = await axios.put(`${this.apiUrl}/${id}`, post);
    return this.postRepository.save(response.data);
  }

  async deletePost(id: number) {
    const response = await axios.delete(`${this.apiUrl}/${id}`);
    return response.data;
  }
}
