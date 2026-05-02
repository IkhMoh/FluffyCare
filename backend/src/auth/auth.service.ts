import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const admin = await this.prisma.admin.findUnique({ where: { email } });
    if (!admin) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const token = await this.jwtService.signAsync({ sub: admin.id, email: admin.email });
    return {
      token,
      admin: { id: admin.id, email: admin.email, name: admin.name },
    };
  }

  async getMe(adminId: number) {
    return this.prisma.admin.findUnique({
      where: { id: adminId },
      select: { id: true, email: true, name: true, createdAt: true },
    });
  }
}
