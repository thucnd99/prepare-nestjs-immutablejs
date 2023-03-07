import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
} from '@nestjs/common';
import { User } from '../models/user.class';
import { Observable } from 'rxjs';

@Controller('user')
export class UserController {
  @Get('profile')
  register(@Body() user: User): string {
    return 'profile';
  }

  @Post('update')
  @HttpCode(HttpStatus.OK)
  login(@Body() user: User): string {
    return ' profile';
  }
}
