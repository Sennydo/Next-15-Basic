"use server"

import { getCollection } from "@/lib/db";
import { RegisterFormSchema } from "@/lib/rules";

export async function register(state, formData){

    //This is just to add load time test

    const validatedFields = RegisterFormSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPass")
    })
    console.log(validatedFields)

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            email: formData.get("email"),
        }
    }

    console.log("Register actions \n")

    await new Promise(resolve => setTimeout(resolve, 1000));

    const {email, password} = validatedFields.data;
    const userCollection =  await getCollection('users')
    console.log(userCollection)

}