import { TCourse } from "./course.interface";
import { CourseModel } from "./course.model";

const createCourseIntoDB = async (courseData: TCourse) => {
  const result = await CourseModel.create(courseData);
  return result;
};

const getAllCourseFromDB = async () => {
  const result = await CourseModel.find();
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
};
