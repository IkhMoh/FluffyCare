import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtGuard } from './jwt.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }

  @Post('logout')
  logout() {
    return { success: true };
  }

  @UseGuards(JwtGuard)
  @Get('me')
  me(@Req() req: { user: { id: number } }) {
    return this.authService.getMe(req.user.id);
  }
}
