import { Injectable } from "@nestjs/common";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Course } from "./schemas/course.schema";
import { CourseType } from "../../ts-types/CourseType";

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course.name) private courseModel: Model<CourseType>) {
  }

  async create(createCourseDto: CreateCourseDto): Promise<CourseType> {
    return await (new this.courseModel(createCourseDto)).save() as CourseType;
  }

  async findAll(): Promise<Array<CourseType>> {
    return (await this.courseModel.find().sort("-createdAt").exec());
  }

  async findOne(url: string): Promise<CourseType> {
    return (await this.courseModel.findOne({ url: url })) as CourseType;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<CourseType> {
    return (await this.courseModel.findOneAndUpdate({ _id: id }, { ...updateCourseDto }, { new: true })) as CourseType;
  }

  async remove(id: string) {
    return (await this.courseModel.deleteOne({ _id: id }));
  }
  async deleteMany(){
    return this.courseModel.deleteMany();
  }
}
