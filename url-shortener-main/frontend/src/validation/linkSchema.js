import {z} from "zod";

export const createLinkSchema = z.object({
    fullUrl:z.url("Please enter a valid url"),
    userSlug:z.string("Please enter a valid slug").min(3,"Please enter 3 characters for custom slug").optional()
})