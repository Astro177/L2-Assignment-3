import httpStatus from "http-status";
import { CourseModel } from "../course/course.model";
import { TReview } from "./review.interface";
import { ReviewModel } from "./review.model";
import mongoose from "mongoose";

const createReviewIntoDB = async (reviewData: TReview) => {
  const courseExist = await CourseModel.findById(reviewData.courseId);

  if (courseExist) {
    const data = await ReviewModel.create(reviewData);
    const result = {
      _id: data._id,
      courseId: data.courseId,
      rating: data.rating,
      review: data.review,
    };
    return result;
  } else {
    throw new Error("CourseId does not exist");
  }
};

const getSingleCourseWithReviewFromDB = async (courseId: string) => {
  const singleCourse = await CourseModel.findById(courseId);
  if (singleCourse) {
    const validCourseId = new mongoose.Types.ObjectId(courseId);
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

export const ReviewServices = {
  createReviewIntoDB,
  getSingleCourseWithReviewFromDB,
};
