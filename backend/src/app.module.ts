import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AnimalsModule } from './animals/animals.module';

@Module({
  imports: [PrismaModule, AuthModule, AnimalsModule],
})
export class AppModule {}
