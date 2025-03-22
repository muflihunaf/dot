/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { CacheModule } from '@nestjs/cache-manager';
@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    CacheModule.register({
      ttl: parseInt(process.env.CACHE_TTL || '5', 10),
      max: parseInt(process.env.CACHE_MAX || '100', 10),
    }),
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
