import { Body, Controller, Post } from '@nestjs/common';
import { User } from '../models/user.interface';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  create(@Body() user: User): Observable<User> {
    return this.authService.registerAccount(user);
  }
}
