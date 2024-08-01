import { ZodSchema } from "zod";
import { z } from "zod";

export const profileSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  username: z.string().min(2),
});

export function validateWithZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    // array of errors
    const errors = result.error.errors.map((err) => err.message);
    throw new Error(errors.join(","));
  }

  return result.data;
}

export const imageSchema = z.object({
  image: validateFile(),
});

export const propertySchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters",
    })
    .max(100, {
      message: "Name must not exceed 100 characters",
    }),
  tagline: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters",
    })
    .max(100, {
      message: "Name must not exceed 100 characters",
    }),
  price: z.coerce.number().int().min(0, {
    message: "Price must be a positive number",
  }),
  category: z.string(),
  description: z.string(),
  country: z.string(),
  guests: z.coerce.number().int().min(0).max(10),
  bedrooms: z.coerce.number().int().min(0),
  beds: z.coerce.number().int().min(0),
  baths: z.coerce.number().int().min(0),
  amenities: z.string(),
});

function validateFile() {
  const maxUploadSize = 1024 * 10000;
  const acceptedFileTypes = ["image/"];
  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize;
    }, "File size must be less than 1 MB")
    .refine((file) => {
      return (
        !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
      );
    }, "File must be an image");
}
