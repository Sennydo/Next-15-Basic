"use server"

import { getCollection } from "@/lib/db";
import { RegisterFormSchema } from "@/lib/rules";
import bcrypt from "bcrypt"
import { redirect } from "next/dist/server/api-utils";

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

    //Extracting form fields
    const {email, password} = validatedFields.data;

    //check if dat exists
    const userCollection =  await getCollection('users')

    if(!userCollection) {
        return {errors: {email:"Server error"}}
    }
    const existingUser = await userCollection.findOne({email})
    if (existingUser) {
        return {errors: {email: "Email already exists"},};
    }

    //Hashing pass
    const hashedPassword = await bcrypt.hash(password, 10)

    const results = await userCollection.insertOne({
        email,
        password: hashedPassword
    })
    console.log(results)

    //Redirection
    redirect("/dashboard")

}