import { Router } from "express";
import { CourseRoutes } from "../modules/course/course.route";
import { CategoryRoutes } from "../modules/category/category.route";

const router = Router();

router.use(CourseRoutes);
router.use(CategoryRoutes);

export default router;
