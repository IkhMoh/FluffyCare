"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AnimalsService = class AnimalsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getPublicAnimals(species, search) {
        return this.prisma.animal.findMany({
            where: {
                status: 'Available',
                ...(species && species !== 'All' ? { species } : {}),
                ...(search ? { name: { contains: search, mode: 'insensitive' } } : {}),
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    getAnimalById(id) {
        return this.prisma.animal.findUnique({ where: { id } });
    }
    getAdminAnimals(search, species, status) {
        return this.prisma.animal.findMany({
            where: {
                ...(search ? { name: { contains: search, mode: 'insensitive' } } : {}),
                ...(species && species !== 'All' ? { species } : {}),
                ...(status && status !== 'All' ? { status } : {}),
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    createAnimal(body) {
        return this.prisma.animal.create({ data: body });
    }
    updateAnimal(id, body) {
        return this.prisma.animal.update({ where: { id }, data: body });
    }
    deleteAnimal(id) {
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
};
exports.AnimalsService = AnimalsService;
exports.AnimalsService = AnimalsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnimalsService);
//# sourceMappingURL=animals.service.js.map