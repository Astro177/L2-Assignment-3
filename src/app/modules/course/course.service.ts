import { Types } from "mongoose";
import { CategoryModel } from "../category/category.model";
import { ReviewModel } from "../review/review.model";
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

const getSingleCourseWithReviewFromDB = async (courseId: string) => {
  const singleCourse = await CourseModel.findById(courseId);
  if (singleCourse) {
    const validCourseId = new Types.ObjectId(courseId);
    const reviews = await ReviewModel.aggregate([
      { $match: { courseId: validCourseId } },
      {
        $project: {
          _id: 0,
          courseId: 1,
          rating: 1,
          review: 1,
        },
      },
    ]);
    const result = { singleCourse, reviews };
    return result;
  }
};

const getBestCourseFromDB = async () => {
  const bestCourse = await ReviewModel.aggregate([
    {
      $group: {
        _id: "$courseId",
        averageRating: { $avg: "$rating" },
        reviewCount: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "courses",
        localField: "_id",
        foreignField: "_id",
        as: "course",
      },
    },
  ]);

  const result = bestCourse.map((item) => {
    return {
      course: item.course[0],
      averageRating: parseFloat(item.averageRating.toFixed(1)),
      reviewCount: item.reviewCount,
    };
  });

  return result[0];
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseWithReviewFromDB,
  getBestCourseFromDB,
};
