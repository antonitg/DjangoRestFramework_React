import { AttemptRegister } from '../../hooks/register'
import { useForm } from 'react-hook-form';
import React, { useRef } from "react"
export default function Register() {
const { register, handleSubmit, watch, formState: { errors } } = useForm();
const password = useRef({});
password.current = watch("password", "");
const { mutateAsync } = AttemptRegister()
function onSubmit(data) {
    console.log(data);
    mutateAsync({
      user: {
        data,
      },
    })
}
return (
    <> 
        <div className="card px-5 py-5 pbg-primary" id="form1">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-data">
            <div className="form-floating mb-4">
                <input
                type="text"
                className="form-control"
                id="floatingPassword"
                placeholder="Username"
                {...register("username", { required: "You must specify a Username.", 
                minLength: {
                    value: 4,
                    message: "Username must be at least 4 characters long."                    
                },
                maxLength: {
                    value: 14,
                    message: "Username must have less than 15 characters."
                }})}
                />
                <label htmlFor="floatingPassword">Username</label>
                {errors.username && (
                <p className="pinvalid">{errors.username.message}</p>
                )} 
            </div>
            <div className="form-floating mb-4">
                <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                {...register("email", { required: "You must specify an email",
                    pattern: {
                        value: /^\S+@\S+$/i ,
                        message: "That's not a valid email" 
                    } })}
                />
                <label htmlFor="floatingInput">Email address</label>
                {errors.email && (
                <p className="pinvalid">{errors.email.message}</p>
                )}            
            </div>
            <div className="form-floating mb-4">
                <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                {...register("password", {
                    required: "You must specify a password",
                    min: 6,
                    pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i,
                    message:
                        "Password must have minimum eight characters, at least one letter, one number and one special character",
                    },
                })}
                />
                <label htmlFor="floatingPassword">Password</label>
                {errors.password && (
                <p className="pinvalid">{errors.password.message}</p>
                )}
            </div>
            <div className="form-floating mb-4">
                <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                {...register("password2", {
                    required: "You must specify a password",
                    min: 8,
                    pattern: {
                    value:
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i,
                    message: "Password must have minimum eight characters, at least one letter, one number and one special character",
                    },
                    validate: (value) =>
                    value === password.current || "The passwords do not match",
                })}
                />
                <label htmlFor="floatingPassword">Repeat Password</label>
                {errors.password2 && (
                <div className="pinvalid">{errors.password2.message}</div>
                )}
            </div>
            <div className="mb-3">
                <button type="submit" className="pprimary btn btn-dark w-100">
                Register
                </button>
            </div>
            </div>
        </form>
        </div>
   </>
   )
 }