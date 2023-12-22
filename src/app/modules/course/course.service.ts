import { CategoryModel } from "../category/category.model";
import { TCourse } from "./course.interface";
import { CourseModel } from "./course.model";

const calculateWeeks = (startDate: string, endDate: string) => {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();

  const difference = end - start;
  const totalWeeks = Math.ceil(difference / (1000 * 60 * 60 * 24 * 7));
  return totalWeeks;
};

const createCourseIntoDB = async (courseData: TCourse) => {
  const categoryExists = await CategoryModel.findById({
    _id: courseData.categoryId,
  });
  if (categoryExists) {
    if ((courseData?.startDate, courseData?.endDate)) {
      const durationInWeeks = calculateWeeks(
        courseData?.startDate,
        courseData?.endDate
      );
      const newData = { ...courseData, durationInWeeks };
      const result = await CourseModel.create(newData);
      return result;
    }
  }
};

const getAllCourseFromDB = async () => {
  const result = await CourseModel.find();
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
};
