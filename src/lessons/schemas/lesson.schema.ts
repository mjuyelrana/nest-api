import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Document } from "mongoose";
import { Course } from "../../courses/schemas/course.schema";
import { LessonType } from "../../../ts-types/LessonType";

@Schema({
  collection: "lessons",
  timestamps: true
})
export class Lesson extends Document implements Partial<LessonType> {
  @Prop()
  description: string;

  @Prop()
  duration: string;

  @Prop()
  seqNo: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Course" })
  course: "Course";
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);

// import mongoose, { model, Schema } from "mongoose";
// import { Course } from "../../courses/schemas/course.schema";
//
// export const LessonSchema = new Schema({
//   description: { type: String },
//   duration: { type: String },
//   seqNo: { type: Number },
//   course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }
// },{collection: "lessons", timestamps: true});
// export const Lesson = model("Lesson", LessonSchema);
