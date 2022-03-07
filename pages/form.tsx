import { NextPage } from "next";
import { useForm } from "react-hook-form";

type onValid = {
  username: string;
  email: string;
  password: string;
  error?: string;
};

const Form: NextPage = () => {
  const {
    register,
    watch,
    handleSubmit,
    setError,
    reset,
    resetField,
    formState: { errors },
  } = useForm<onValid>({
    defaultValues: {
      email: "123@123",
    },
  });

  console.log(errors);
  const onSubmit = (data: onValid) => {
    const { username, email, password } = data;
    reset();
  };
  return (
    <form
      className="flex flex-col  space-y-2 bg-blue-100 p-5 focus-within:bg-blue-100"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        {...register("username", {
          required: true,
          minLength: {
            message: "This password should be longer then 3 char",
            value: 3,
          },
        })}
        type="text"
        placeholder="Username"
        className={`${
          Boolean(errors.username) ? "border-red-500 text-red-600" : ""
        }`}
      />
      <span className="text-blue-600">{errors.username?.message}</span>
      <input
        {...register("email", {
          required: "Email is required",
          validate: {
            notGmail: (value) =>
              !value.includes("@gmail.com") || "Gmail is not allowed",
          },
        })}
        type="email"
        placeholder="Email"
      />
      {errors.email?.message}
      <input
        {...register("password", {
          required: "Password is required",
          minLength: {
            message: "This password should be longer then 3 char",
            value: 3,
          },
        })}
        type="password"
        placeholder="Password"
      />
      {errors.password?.message}
      <input type="submit" />
    </form>
  );
};

export default Form;
