import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('verify')
  async verify(@Body('email') email: string) {
    return this.authService.validateUser(email);
  }

  @Post('login')
  async login(@Body('email_verify') email_verify: string) {
    return this.authService.login(email_verify);
  }
}
