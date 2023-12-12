import express from "express";
import { courseControllers } from "./course.controllers";
import { validateRequest } from "../../middlewares/validateRequest";
import { courseValidations } from "./course.validation";

const router = express.Router();

router.post(
  "/course",
  validateRequest(courseValidations.createCourseValidationSchema),
  courseControllers.createCourse
);
router.get("/courses", courseControllers.getAllCourse);

export const CourseRoutes = router;
