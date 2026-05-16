//src/validation/authSchema.js
import { z } from "zod";

export const registerSchema = z.object({
    username:z.string().max(14,"Username must be less than 15").min(3,"Username must be more than 2"),
    email:z.string().email("Invalid Email"),
    password:z.string().min(6,"Password must be more than 5")
})

export const loginSchema = z.object({
    email:z.string().email("Email must be valid"),
    password:z.string().min(6,"Password must be more than 5")
})
