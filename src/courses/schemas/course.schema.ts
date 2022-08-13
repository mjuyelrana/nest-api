import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { CourseType } from "../../../ts-types/CourseType";

@Schema({
  collection: "courses",
  timestamps: true
})
export class Course extends Document implements CourseType {
  @Prop()
  category: string;

  @Prop()
  courseListIcon: string;

  @Prop()
  description: string;

  @Prop()
  iconUrl: string;

  @Prop()
  lessonsCount: number;

  @Prop()
  longDescription: string;

  @Prop()
  promo: boolean;

  @Prop()
  seqNo: number;

  @Prop({ index: true, unique: true })
  url: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
// import { model, Schema } from "mongoose";
// import { CourseType } from "../../../ts-types/CourseType";
//
// export const CourseSchema = new Schema<CourseType>({
//     category: {type: String},
//     courseListIcon: {type: String},
//     description: {type: String},
//     iconUrl: {type: String},
//     lessonsCount: {type: Number},
//     longDescription: {type: String},
//     promo: {type: Boolean},
//     seqNo: {type: Number},
//     url: { type: String, index: true, unique: true }
//   }, {
//     collection: "courses",
//     timestamps: true
//   }
// );
//
// export const Course = model<CourseType>("Course", CourseSchema);