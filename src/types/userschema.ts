import * as z from "zod";

export const userSchema = z
    .string()
    .min(5, "Username must be at least 5 characters long")
    .regex(/^[a-zA-Z0-9]*$/, "Username can only contain letters and numbers");
