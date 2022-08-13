import { findAllCourses, findAllUsers, findLessonsForCourse } from "./db";
import { dbName, MONGO_URI } from "../constants";

const util = require("util");
const password = require("password-hash-and-salt");

const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const insertData = async () => {
  console.log("Sample data seeding...");

  const client = new MongoClient(MONGO_URI);

  client.connect(async (err: any) => {
    try {
      if (err) {
        console.log("Error connecting to database, please check the username and password, exiting.");
        process.exit();
      }
      console.log("Connected correctly to server");
      const db = client.db(dbName);
      const courseCollection = db.collection("courses");
      const lessonCollection = db.collection("lessons");
      const userCollection = db.collection("users");

      console.log("Start Deleting Previous Data...");
      await userCollection.deleteMany();
      await courseCollection.deleteMany();
      await lessonCollection.deleteMany();
      console.log("Previous Data Delete Completed!!");

      const users = findAllUsers();
      console.log("Inserting users " + users.length);

      for (let j = 0; j < users.length; j++) {
        const user = users[j];
        const newUser: any = { ...user };
        delete newUser.id;
        const hashPassword = util.promisify(password(newUser.password).hash);
        newUser.passwordHash = await hashPassword();
        delete newUser.password;
        console.log("Inserting user", newUser);
        await userCollection.insertOne(newUser);
      }

      const courses = findAllCourses();
      for (let i = 0; i < courses.length; i++) {
        const course: any = courses[i];
        const newCourse: any = { ...course };
        delete newCourse.id;

        console.log("Inserting new course: ", newCourse);

        const result = await courseCollection.insertOne(newCourse);
        const courseId = result.insertedId;

        console.log("New Course ID: ", courseId);

        const lessons = findLessonsForCourse(course.id);

        for (let j = 0; j < lessons.length; j++) {
          const lesson = lessons[j];
          const newLesson: any = { ...lesson };
          delete newLesson.id;
          delete newLesson.courseId;
          newLesson.course = new ObjectId(courseId);
          console.log("Inserting lesson: ", newLesson);
          await lessonCollection.insertOne(newLesson);
        }
      }
      console.log("Finished uploading data, creating indexes.");
      await courseCollection.createIndex({ "url": 1 }, { unique: true });
      console.log("Finished creating indexes, exiting.");
      await client.close();
      process.exit();

    } catch (error) {
      console.log("Error caught, exiting: ", error);
      await client.close();
      process.exit();
    }

  });

  console.log("Uploading data to MongoDB...");

  process.stdin.resume();
};

if (process.argv[0]) {
  insertData().then(r => Promise.resolve(r)).finally(() => {
    console.log("Process completed");
  });
}
