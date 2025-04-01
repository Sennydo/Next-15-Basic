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
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPass");

    console.log(email);
    console.log(password);
    console.log(confirmPassword);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const userCollection =  await getCollection('users')
    console.log(userCollection)

}