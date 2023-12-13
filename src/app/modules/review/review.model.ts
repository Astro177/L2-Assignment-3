import { Schema, model } from "mongoose";
import { TReview } from "./review.interface";

const reviewSchema = new Schema<TReview>({
  courseId: { type: String, required: true },
  rating: { type: Number, required: true },
  review: { type: String, required: true },
});

export const ReviewModel = model<TReview>("Review", reviewSchema);
