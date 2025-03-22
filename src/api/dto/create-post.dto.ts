/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ description: 'The title of the post' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'The body of the post' })
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiProperty({ description: 'The user id of the post' })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
