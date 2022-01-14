import { useForm } from "react-hook-form";
import React from "react";
import { AttemptAuth } from '../../hooks/attemptAuth'
export default function Login() {
  const { mutateAsync } = AttemptAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  function onSubmit(data) {
    console.log(data);
    mutateAsync({
      user: {
        data,
      },
    })
  } 
  console.log(errors);
  return (
    <>
      <div className="card px-5 py-5 pbg-primary" id="form1">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-data">
            <div className="form-floating mb-4">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="name123"
                {...register("username", { required: "You must specify an username"})}
              />
              <label htmlFor="floatingInput">Username</label>
              {errors.Email && (
                <p className="pinvalid">{errors.username.message}</p>
                )}
            </div>
            <div className="form-floating mb-4">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                {...register("password", { required: "You must specify your password."})}
              />
              <label htmlFor="floatingPassword">Password</label>
              {errors.Password && (
                <p className="pinvalid">{errors.password.message}</p>
                )}
            </div>
            <div className="mb-3">
              <button className="pprimary btn btn-dark w-100">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
