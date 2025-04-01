import {z} from "zod"

export const RegisterFormSchema = z.object({
    email: z.string().email({message:"Enter valid email"}).trim(),

    password: z.string().min(1, {message:"Not be empty"}).min(5, {message:"Be 5 characters long"}),

    confirmPassword: z.string({message:"Passwords don't match"})

}).superRefine((val, ctx) => {
    if(val.password != val.confirmPassword) {
        ctx.addIssue({
            code:z.ZodIssueCode.custom,
            message:"Passwords don't match",
            path: ["confirmPassword"]
        })
    }
});