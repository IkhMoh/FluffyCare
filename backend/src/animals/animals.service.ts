import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';

@Injectable()
export class AnimalsService {
  constructor(private readonly prisma: PrismaService) {}

  getPublicAnimals(species?: string, search?: string) {
    return this.prisma.animal.findMany({
      where: {
        status: 'Available',
        ...(species && species !== 'All' ? { species } : {}),
        ...(search ? { name: { contains: search, mode: 'insensitive' } } : {}),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  getAnimalById(id: number) {
    return this.prisma.animal.findUnique({ where: { id } });
  }

  getAdminAnimals(search?: string, species?: string, status?: string) {
    return this.prisma.animal.findMany({
      where: {
        ...(search ? { name: { contains: search, mode: 'insensitive' } } : {}),
        ...(species && species !== 'All' ? { species } : {}),
        ...(status && status !== 'All' ? { status } : {}),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  createAnimal(body: CreateAnimalDto) {
    return this.prisma.animal.create({ data: body });
  }

  updateAnimal(id: number, body: UpdateAnimalDto) {
    return this.prisma.animal.update({ where: { id }, data: body });
  }

  deleteAnimal(id: number) {
    return this.prisma.animal.delete({ where: { id } });
  }

  async getStats() {
    const [totalAnimals, available, pending, adopted] = await Promise.all([
      this.prisma.animal.count(),
      this.prisma.animal.count({ where: { status: 'Available' } }),
      this.prisma.animal.count({ where: { status: 'Pending' } }),
      this.prisma.animal.count({ where: { status: 'Adopted' } }),
    ]);

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const newThisMonth = await this.prisma.animal.count({
      where: { createdAt: { gte: startOfMonth } },
    });

    return { totalAnimals, available, pending, adopted, newThisMonth };
  }
}
