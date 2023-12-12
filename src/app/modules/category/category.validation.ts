import { z } from "zod";

const createCategorySchema = z.object({
  name: z.string({
    required_error: "Category name is required",
    invalid_type_error: "Category name be a string",
  }),
});

export const categorySchemas = {
  createCategorySchema,
};
