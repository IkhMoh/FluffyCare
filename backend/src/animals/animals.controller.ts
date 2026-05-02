import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { JwtGuard } from '../auth/jwt.guard';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';

@Controller('api')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Get('animals')
  getPublicAnimals(@Query('species') species?: string, @Query('search') search?: string) {
    return this.animalsService.getPublicAnimals(species, search);
  }

  @Get('animals/:id')
  getAnimalById(@Param('id', ParseIntPipe) id: number) {
    return this.animalsService.getAnimalById(id);
  }

  @UseGuards(JwtGuard)
  @Get('admin/animals')
  getAdminAnimals(
    @Query('search') search?: string,
    @Query('species') species?: string,
    @Query('status') status?: string,
  ) {
    return this.animalsService.getAdminAnimals(search, species, status);
  }

  @UseGuards(JwtGuard)
  @Post('admin/animals')
  createAnimal(@Body() body: CreateAnimalDto) {
    return this.animalsService.createAnimal(body);
  }

  @UseGuards(JwtGuard)
  @Patch('admin/animals/:id')
  updateAnimal(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateAnimalDto) {
    return this.animalsService.updateAnimal(id, body);
  }

  @UseGuards(JwtGuard)
  @Delete('admin/animals/:id')
  deleteAnimal(@Param('id', ParseIntPipe) id: number) {
    return this.animalsService.deleteAnimal(id);
  }

  @UseGuards(JwtGuard)
  @Get('admin/stats')
  getStats() {
    return this.animalsService.getStats();
  }
}
