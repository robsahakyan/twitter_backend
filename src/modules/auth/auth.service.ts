import { UserEntity } from './../user/user.entity';
import { Injectable } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {UtilsProvider} from '../../providers/utils.provider';
import {ApiConfigService} from '../../shared/services/api-config.service';
import {UserService} from '../user/user.service';
import {TokenPayloadDto} from "../common/modules/auth/token-payload.dto";
import {LoginDto} from "./dtoes/login.dto";
import {IGenerateJWTOptions} from "../common/interfaces/IGenerateJWTOptions";
import {UserUnauthenticatedException} from "./exceptions/user-unauthenticated.exception";
import {LoginPayloadDto} from "../common/modules/auth/login-payload.dto";
import {RegisterDto} from "./dtoes/register.dto";
import { TokenTypeEnum } from '../../constants/token-type.enum';

@Injectable()
export class AuthService {
  constructor(
      public readonly jwtService: JwtService,
      public readonly configService: ApiConfigService,
      public readonly userService: UserService
  ) {}

  async generateToken(options: IGenerateJWTOptions): Promise<TokenPayloadDto> {
    return options.expiresIn ? {
      expiresIn: options.expiresIn,
      token: await this.jwtService.signAsync(options.payload, {expiresIn: options.expiresIn}),
    } : {
      expiresIn: options.expiresIn,
      token: await this.jwtService.signAsync(options.payload),
    };
  }

  async validateUser(loginDto: LoginDto): Promise<UserEntity> {
    const userEntity = await this.userService.getEntityByEmail(loginDto.email);
    const isPasswordValid = await UtilsProvider.validateHash(
        loginDto.password,
        userEntity.password,
    );

    if (!isPasswordValid) {
      const description = 'password is an invalid'
      throw new UserUnauthenticatedException(description);
    }

    return userEntity;
  }

  async checkPasswordStrongility(registerDto: RegisterDto): Promise<void>{
    const password = registerDto.password.toLowerCase();
    const credentials = {...registerDto};
    delete credentials.password;

    for (let key in credentials) {
      let iter = credentials[key].toLowerCase();
      for (let i = 0; i < iter.length - 2; ++i) {
        let str = iter[i] + iter[i + 1] + iter[i + 2];
        if (password.includes(str)) {
          throw new UserUnauthenticatedException("This password can be easily guessed,use strong password")
        }
      };
    }
  }

  async login(userInfo: LoginDto | UserEntity): Promise<LoginPayloadDto> {
    let userEntity: UserEntity;
    if(userInfo instanceof UserEntity) {
      
      userEntity = userInfo;
    } else {
      userEntity = await this.validateUser(userInfo);
    }

    const token = await this.generateToken({payload: {id: userEntity.id, type: TokenTypeEnum.AUTH}, expiresIn: this.configService.authConfig.jwtExpirationTime});
    const user = userEntity.toDto();
    return { user, token };
  }

  async registerAndLogin(registerDto: RegisterDto): Promise<LoginPayloadDto> {
    await this.checkPasswordStrongility(registerDto);
    const userEntity = await this.userService.create(registerDto)
    .catch((err) => {
      throw new UserUnauthenticatedException(err);
    });

    return this.login(userEntity);
  }
}
