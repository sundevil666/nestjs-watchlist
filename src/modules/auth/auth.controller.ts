import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../users/dto';
import { UserLoginDTO } from './dto';
import { AuthUserResponse } from './response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guqrds/jwt-guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @ApiTags('API/auth')
  @ApiResponse({ status: 201, type: CreateUserDTO })
  @Post('register')
  registerUser (@Body() dto: CreateUserDTO): Promise<CreateUserDTO> {
    return this.authService.registerUser(dto)
  }

  @ApiTags('API/auth')
  @Post('login')
  @ApiResponse({ status: 200, type: AuthUserResponse })
  loginUser(@Body() dto: UserLoginDTO): Promise<AuthUserResponse> {
    return this.authService.loginUser(dto)
  }

  @UseGuards(JwtAuthGuard)
  @Post('test')
  test() {
    return 'test'
  }
}
