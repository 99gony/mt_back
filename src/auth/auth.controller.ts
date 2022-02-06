import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Controller, Get, UseGuards, Req, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/apple')
  @UseGuards(AuthGuard('apple'))
  appleLogin() {}

  @Post('/apple/callback')
  @UseGuards(AuthGuard('apple'))
  async appleLoginCallback(@Req() req) {
    console.log('req : ', req);
    return 'ok';
  }
}
