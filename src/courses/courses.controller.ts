import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CoursesService } from "./courses.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { ApiTags } from "@nestjs/swagger";
import { CourseType } from "../../ts-types/CourseType";
import { AuthGuard } from "../guards/auth.guard";
import { AdminGuard } from "../guards/admin.guard";

@ApiTags("Courses")
@Controller("courses")
@UseGuards(AuthGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {
  }

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  async findAll(): Promise<Array<CourseType>> {
    return this.coursesService.findAll();
  }

  @Get(":url")
  findByCourseUrl(@Param("url") url: string) {
    const course = this.coursesService.findOne(url);
    if (!course) {
      throw new NotFoundException("Could not find course for url " + url);
    }
    return course;
  }

  @Put(":id")
  @UseGuards(AdminGuard)
  update(@Param("id") id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(":id")
  @UseGuards(AdminGuard)
  remove(@Param("id") id: string) {
    return this.coursesService.remove(id);
  }
}
