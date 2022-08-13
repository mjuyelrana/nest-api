import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  BadRequestException
} from "@nestjs/common";
import { LessonsService } from "./lessons.service";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { UpdateLessonDto } from "./dto/update-lesson.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Lessons")
@Controller("lessons")
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {
  }

  @Post()
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(createLessonDto);
  }

  @Get()
  findAll(
    @Query("courseId") courseId?: string,
    @Query("sortOrder") sortOrder = "asc",
    @Query("pageNumber", ParseIntPipe) pageNumber = 0,
    @Query("pageSize", ParseIntPipe) pageSize = 3) {
    if (!courseId) {
      return this.lessonsService.findAll();
    }
    if (sortOrder != "asc" && sortOrder != "desc") {
      throw new BadRequestException("sortOrder must be asc or desc.");
    }
    return this.lessonsService.searchByCourseId(courseId, sortOrder, pageNumber, pageSize);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.lessonsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(+id, updateLessonDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.lessonsService.remove(+id);
  }
}
