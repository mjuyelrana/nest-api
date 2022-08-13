import { Injectable } from "@nestjs/common";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { UpdateLessonDto } from "./dto/update-lesson.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Lesson } from "./schemas/lesson.schema";

@Injectable()
export class LessonsService {
  constructor(@InjectModel(Lesson.name) private lessonModel: Model<Lesson>) {
  }

  create(createLessonDto: CreateLessonDto) {
    return "This action adds a new lesson";
  }

  async findAll(): Promise<Array<Lesson>> {
    return (await this.lessonModel.find().sort("-createdAt").exec());
  }

  async searchByCourseId(courseId: string, sortOrder: string, pageNumber: number, pageSize: number): Promise<Array<Lesson>> {
    return (await this.lessonModel.find({ course: courseId }, null, {
      skip: pageNumber * pageSize,
      limit: pageSize,
      sort: { seqNo: sortOrder }
    }));
  }

  async deleteMany(){
    return this.lessonModel.deleteMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} lesson`;
  }

  update(id: number, updateLessonDto: UpdateLessonDto) {
    return `This action updates a #${id} lesson`;
  }

  remove(id: number) {
    return `This action removes a #${id} lesson`;
  }
}
