import React, { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";

type Valid = {
  username: string;
  email: string;
  password: string;
  errors?: string;
};

export default function Forms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    reset,
  } = useForm<Valid>({
    mode: "onChange",
  });

  const onValid = (data: Valid) => {
    console.log(data);
    reset();
  };

  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <input
        {...register("username", {
          required: "Username is required",
          minLength: {
            message: "The username should be longer than 5 char.",
            value: 2,
          },
        })}
        type="text"
        placeholder="Username"
      />
      {errors.email?.message}
      <input
        {...register("email", {
          required: "Email is required",
          validate: {
            notGmail: (value) =>
              !value.includes("@gmail") || "Gmail is not allowed",
          },
        })}
        className={`${Boolean(errors.email) ? "border-red-500" : ""}`}
        type="email"
        placeholder="Email"
      />
      <input
        {...register("password", { required: "Password is required" })}
        type="password"
        placeholder="Password"
      />
      <input type="submit" value="Create Account" />
      {errors.errors?.message}
    </form>
  );
}
