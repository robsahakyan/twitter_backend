import { GetHashtagDto } from './dtoes/get-hashtag.dto';
import { CreateTweetDto } from './dtoes/create-tweet.dto';
import { Body, Controller, Get, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../../decorators/http.decorators';
import { ApiFile } from '../../decorators/swagger.decorator';
import { StorageProvider } from '../../providers/storage.provider';

import { TweetService } from './tweet.service';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { UserDto } from '../../modules/common/modules/user/user.dto';

@Controller('tweet')
@ApiTags('tweet')
export class TweetController {
  constructor(public readonly tweetService: TweetService) {}

  @Post()
  @Auth()
  @ApiFile([{ name: 'images', isArray: true }], {
    okResponseData: {
      description: 'image creation',
    },
  })
  @UseInterceptors(
    FilesInterceptor(
      'images',
      5,
      StorageProvider.productImageUploadFileOptions,
    ),
  )
  async createTweet(
    @UploadedFiles() files,
    @Body() createTweetDto: CreateTweetDto,
    @AuthUser() user: UserDto,
  ){
    return this.tweetService.createTweet(files, createTweetDto, user);
  }

  @Get(':tweetId')
  async getTweetById(@Param("tweetId") tweetId: string) {
    return this.tweetService.getTweetById(tweetId)
  }


  @Post('hashtags-posts')
  async getHashtagByName(@Body() getHashtagDto: GetHashtagDto) {
    return this.tweetService.getHashtagByName(getHashtagDto.hashtag)
  }

}
