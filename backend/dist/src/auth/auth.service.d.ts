import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    login(email: string, password: string): Promise<{
        token: string;
        admin: {
            id: number;
            email: string;
            name: string;
        };
    }>;
    getMe(adminId: number): Promise<{
        id: number;
        email: string;
        name: string;
        createdAt: Date;
    }>;
}
