import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto, UpdateCourseDto } from './dto/create-course.dto';
import { Public } from 'src/common/decorators';
import { AtInsGuard } from 'src/common/guards';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Public()
  @UseGuards(AtInsGuard)
  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Public()
  @UseGuards(AtInsGuard)
  @Get()
  async findAll() {
    return await this.coursesService.findAll();
  }

  @Public()
  @UseGuards(AtInsGuard)
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.coursesService.findOne(id);
  }

  @Public()
  @UseGuards(AtInsGuard)
  @Patch(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return await this.coursesService.update(id, updateCourseDto);
  }

  @Public()
  @UseGuards(AtInsGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.coursesService.remove(id);
  }
}
