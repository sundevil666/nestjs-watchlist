import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDTO } from '../users/dto';
import { AppError } from '../../common/constans/errors';
import { UserLoginDTO } from './dto';
import * as bcrypt from 'bcrypt';
import { AuthUserResponse } from './response';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
    ) {
  }

  async registerUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
    try {
      if(await this.userService.findUserByEmail(dto.email)) {
        throw new BadRequestException(AppError.USER_EXISTS)
      }
      return this.userService.createUser(dto)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async loginUser(dto: UserLoginDTO): Promise<AuthUserResponse> {
    try {
      const exitUser = await this.userService.findUserByEmail(dto.email)

      if(!exitUser) {
        throw new BadRequestException(AppError.USER_NOT_EXISTS)
      }

      const validatePassword = await bcrypt.compare(dto.password, exitUser.password)
      if(!validatePassword) {
        throw new BadRequestException(AppError.WRONG_DATA)
      }

      const user = await this.userService.publicUser(dto.email)
      const token = await this.tokenService.generateJwtToken(user)
      return {user,  token}
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
