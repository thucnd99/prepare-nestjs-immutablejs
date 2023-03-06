import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { User } from '../models/user.class';
import { Observable } from 'rxjs';

@Controller('auth')
export class AuthController {
  @Post('register')
  register(@Body() user: User): string {
    return 'register';
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() user: User): string {
    return 'login';
  }
}
