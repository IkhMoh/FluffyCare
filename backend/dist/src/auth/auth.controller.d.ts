import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: LoginDto): Promise<{
        token: string;
        admin: {
            id: number;
            email: string;
            name: string;
        };
    }>;
    logout(): {
        success: boolean;
    };
    me(req: {
        user: {
            id: number;
        };
    }): Promise<{
        id: number;
        email: string;
        name: string;
        createdAt: Date;
    }>;
}
