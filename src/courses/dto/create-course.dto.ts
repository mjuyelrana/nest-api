import { CourseType } from "../../../ts-types/CourseType";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsMongoId, IsString } from "class-validator";

export class CreateCourseDto implements CourseType {

  @IsString()
  @IsMongoId()
  @ApiProperty({
    required: false
  })
  _id: string;

  @ApiProperty({
    required: true
  })
  @IsString()
  category: string;

  @ApiProperty({
    type: String,
    required: false
  })
  @IsString()
  description: string;

  @ApiProperty({
    type: String,
    required: false
  })
  @IsString()
  iconUrl: string;

  @ApiProperty({
    type: Number,
    required: false
  })
  @IsInt({ message: "seqNo must be a numeric value" })
  seqNo: number;

  @ApiProperty({
    type: String,
    required: false
  })
  @IsString({ always: false })
  url: string;

  @ApiProperty({
    required: false
  })
  @IsBoolean()
  promo: boolean;

  @ApiProperty({ required: false })
  @IsString()
  courseListIcon: string;

  @ApiProperty({ required: false })
  @IsInt()
  lessonsCount: number;
}
