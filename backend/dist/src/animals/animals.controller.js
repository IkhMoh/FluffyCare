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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalsController = void 0;
const common_1 = require("@nestjs/common");
const animals_service_1 = require("./animals.service");
const jwt_guard_1 = require("../auth/jwt.guard");
const create_animal_dto_1 = require("./dto/create-animal.dto");
const update_animal_dto_1 = require("./dto/update-animal.dto");
let AnimalsController = class AnimalsController {
    constructor(animalsService) {
        this.animalsService = animalsService;
    }
    getPublicAnimals(species, search) {
        return this.animalsService.getPublicAnimals(species, search);
    }
    getAnimalById(id) {
        return this.animalsService.getAnimalById(id);
    }
    getAdminAnimals(search, species, status) {
        return this.animalsService.getAdminAnimals(search, species, status);
    }
    createAnimal(body) {
        return this.animalsService.createAnimal(body);
    }
    updateAnimal(id, body) {
        return this.animalsService.updateAnimal(id, body);
    }
    deleteAnimal(id) {
        return this.animalsService.deleteAnimal(id);
    }
    getStats() {
        return this.animalsService.getStats();
    }
};
exports.AnimalsController = AnimalsController;
__decorate([
    (0, common_1.Get)('animals'),
    __param(0, (0, common_1.Query)('species')),
    __param(1, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AnimalsController.prototype, "getPublicAnimals", null);
__decorate([
    (0, common_1.Get)('animals/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AnimalsController.prototype, "getAnimalById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)('admin/animals'),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('species')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], AnimalsController.prototype, "getAdminAnimals", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Post)('admin/animals'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_animal_dto_1.CreateAnimalDto]),
    __metadata("design:returntype", void 0)
], AnimalsController.prototype, "createAnimal", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Patch)('admin/animals/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_animal_dto_1.UpdateAnimalDto]),
    __metadata("design:returntype", void 0)
], AnimalsController.prototype, "updateAnimal", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Delete)('admin/animals/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AnimalsController.prototype, "deleteAnimal", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)('admin/stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AnimalsController.prototype, "getStats", null);
exports.AnimalsController = AnimalsController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [animals_service_1.AnimalsService])
], AnimalsController);
//# sourceMappingURL=animals.controller.js.map