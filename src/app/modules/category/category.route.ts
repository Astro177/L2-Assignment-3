import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { categorySchemas } from "./category.validation";
import { categoryControllers } from "./category.controller";

const router = express.Router();

router.post(
  "/categories",
  validateRequest(categorySchemas.createCategorySchema),
  categoryControllers.createCategory
);
router.get("/categories", categoryControllers.getAllCategory);

export const CategoryRoutes = router;
