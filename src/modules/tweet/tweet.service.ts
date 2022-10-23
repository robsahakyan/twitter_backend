import { TweetDto } from './../common/modules/tweet/tweet.dto';
import { ImageRepository } from './image.repository';
import { UserDto } from './../common/modules/user/user.dto';
import { CreateTweetDto } from './dtoes/create-tweet.dto';
import { Injectable } from '@nestjs/common';
import { TweetRepository } from './tweet.repository';
import { TweetEntity } from './tweet.entity';
import { UtilsProvider } from '../../providers/utils.provider';
import { EmptyBodyException } from './exceptions/empty-body.exception';
import { HashtagRepository } from './hashtag.repository';

@Injectable()
export class TweetService {
  constructor(
    private tweetRepository: TweetRepository,
    private hashtagRepository: HashtagRepository,
    private imageRepository: ImageRepository
    ) {}

  async createTweet(files: any, createTweetDto: CreateTweetDto, user: UserDto) {
    if (!files.length && !createTweetDto.text) {
        throw new EmptyBodyException()
    }

    const tweetSaver = await this.tweetRepository.save({
      user: user,
      text: createTweetDto.text
    })

    files.map(async (el) => {
      await this.imageRepository.save({
        path: el.path,
        tweet: tweetSaver
      })
    })
    await this.findHashtagsInText(createTweetDto.text, tweetSaver)
    return (await this.tweetRepository.findById(tweetSaver.id)).toDto()

  }

  async findHashtagsInText(text: string, tweetSaver: TweetEntity) {
    let matchesArr = text.match(/(^|\s)(#[^\s]+)/g);

    if (matchesArr) {
      const setArray = new Set();
      matchesArr.map(el => setArray.add(el.trim()));

      for (const elem of setArray) {
        if (typeof elem === "string") {
          await this.hashtagRepository.save({
            hashtagText: elem,
            tweet: tweetSaver
          });
        }
      }

    }


  }

  async getHashtagByName(hashtag: string) {
     return (await this.hashtagRepository.findByName(hashtag)).map((el) => el.toDto())
  }

  async getTweetById(tweetId: string) {
    return (await this.tweetRepository.findById(tweetId)).toDto()
  }


}
