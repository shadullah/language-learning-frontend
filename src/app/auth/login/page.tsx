"use client";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface ErrorResponseData {
  message: string;
}

const isAxiosError = (
  error: unknown
): error is AxiosError<ErrorResponseData> => {
  return (error as AxiosError).isAxiosError !== undefined;
};

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, setSuccess] = useState(null);
  const router = useRouter();
  // const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    console.log("Form submitted");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await axios.post("/api/v1/users/login", {
        email: email,
        password: password,
      });

      console.log(email, password);

      const { user } = res.data?.data;
      console.log(res.data?.data);
      const { _id } = user;
      console.log(_id);

      localStorage.setItem("id", _id);

      router.push("/user");
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          typeof error.response.data.message === "string"
        ) {
          setError(error.response.data.message);
        } else {
          setError("An Error occurred during Login. Please try again");
        }
      }
    }
  };
  return (
    <div>
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 mt-28">
          Welcome to Login Page
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Login to Unlock the features of lazz-pharma
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              name="email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
              required
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            {loading ? "logging..." : `Login`} &rarr;
            {/* <BottomGradient /> */}
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </form>
        <p>
          Create An Account?{" "}
          <span className="italic underline">
            <Link href={"/auth/register"}>Register Here</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
