/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './modules/api/api.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Post } from './modules/api/entities/post.entity';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || '5432', 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Post],
      synchronize: true,
    }),
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
