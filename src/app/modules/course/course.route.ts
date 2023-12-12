import express from "express";
import { courseControllers } from "./course.controllers";

const router = express.Router();

router.post("/course", courseControllers.createCourse);
router.get("/courses", courseControllers.getAllCourse);

export const CourseRoutes = router;
