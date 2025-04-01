"use client"
import Link from "next/link";
import { useActionState } from "react";
import {register} from "@/actions/auth"

export default function Register(){
    const [state, action, isPending] = useActionState(register, undefined);

    return(
        <div className="container w-1/2">
        <h1 className="title">Register</h1>

        <form action={action} className="spacy-y-4">
            <div>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" defaultValue={state?.email}/>
                {state?.errors?.email && <p className="error">{state.errors.email}</p>}
            </div>
            <br></br>

            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password"></input>
                {state?.errors?.password && 
                (<div className="error">
                    <p>Password should contain: </p>
                    <ul className="list-disc list-inside ml-4">
                        {state.errors.password.map(err =>(
                            <li key={err}>{err}</li>
                        ))}
                    </ul>
                </div>)}
            </div>

            <div>
                <label htmlFor="confirmPass">Confirm Password</label>
                <input type="password" name="confirmPass" />
                {state?.errors?.confirmPassword && (
                    <p className="error">{state.errors.confirmPassword}</p>
                )}
            </div>
            <br></br>

            <div className="flex items-end gap-4">
                <button className="btn-primary" disabled={isPending}>{isPending ? "Loading" : "Register"}</button>
                <Link href="/" className="text-link">Login here</Link>
            </div>



        </form>
        </div>
    )

}