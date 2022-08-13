import { Course } from "../../src/courses/schemas/course.schema";
import { findAllCourses, findLessonsForCourse } from "./db";
import { CourseType } from "../../ts-types/CourseType";
import connectDb from "../config/db-config";
import { LessonType } from "../../ts-types/LessonType";

const insertData = async () => {
  await removeData();
  try {
    console.log("Course inserting----");
    findAllCourses().map(async (course: CourseType) => {
      const newCourse = { ...course, id: undefined };
      // const createdNewCourse = await Course.create(newCourse);
      // console.log("Course Inserted: ", createdNewCourse);
      findLessonsForCourse(course.id ?? 0).map(
        async ({ description, duration, seqNo }: LessonType) => {
          // const createdLesson = await Lesson.create(({ course: createdNewCourse._id, description, duration, seqNo }));
          // if (createdLesson) {
          //   console.log("Lesson Inserted ", createdLesson);
          // }
        });
      console.log(course.lessonsCount + " lessons inserted to " + course.description);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

const removeData = async () => {
  try {
    // await Course.deleteMany();
    // await Lesson.deleteMany();
    console.log("Data destroyed!");
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

(async () => {
  await connectDb();
  if (process.argv[2] === "-d"){
    await removeData();
  }else {
    await insertData();
  }
})();

