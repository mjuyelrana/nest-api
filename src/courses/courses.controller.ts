import { Controller, Get } from "@nestjs/common";
import { Course } from "../../types/course";
import { findAllCourses } from "../../data/db";

@Controller("courses")
export class CoursesController {
  @Get()
  async findAllCourses(): Promise<Array<Course>> {
    return findAllCourses();
  }
}
