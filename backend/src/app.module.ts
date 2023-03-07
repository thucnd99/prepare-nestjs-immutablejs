import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/controllers/auth.controller';
import { UserController } from './auth/controllers/user.controller';

@Module({
  imports: [],
  controllers: [AppController, AuthController, UserController],
  providers: [AppService],
})
export class AppModule {}
