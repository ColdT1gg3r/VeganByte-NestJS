import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() user: User): Promise<User> {
    return this.authService.register(user);
  }

  @UseGuards(AuthGuard('local')) // Debe coincidir con el nombre de la estrategia
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}