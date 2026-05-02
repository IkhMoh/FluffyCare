import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'dev-secret-change-me',
    });
  }

  async validate(payload: { sub: number; email: string }) {
    const admin = await this.prisma.admin.findUnique({ where: { id: payload.sub } });
    if (!admin) {
      throw new UnauthorizedException('Invalid token');
    }
    return { id: admin.id, email: admin.email, name: admin.name };
  }
}
