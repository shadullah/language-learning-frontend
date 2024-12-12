"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

interface ErrorResponseData {
  message: string;
}

const isAxiosError = (
  error: unknown
): error is AxiosError<ErrorResponseData> => {
  return (error as AxiosError).isAxiosError !== undefined;
};

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();
  // const [msg, setMsg] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    // const fullname

    try {
      const response = await axios.post(
        // "/api/v1/users/register",
        "/api/v1/users/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setSuccess("Registration successful!");
        if (e.currentTarget) {
          e.currentTarget.reset();
        }
        router.push("/auth/login");
      }
    } catch (err: unknown) {
      console.log(err);
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
    } finally {
      setLoading(false);
    }
  };
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   console.log("Form submitted");
  // };
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 mt-28">
        Welcome to Register Page
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Register to Unlock the features of lazz-pharma
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        {/* <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4"> */}
        <div className="mb-4">
          <label htmlFor="firstname">Full name</label>
          <input
            id="firstname"
            placeholder="Tyler Rose"
            type="text"
            name="fullname"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            required
            name="email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="file">Profile photo</label>
          <input
            id="photo"
            // placeholder="projectmayhem@fc.com"
            type="file"
            required
            name="photo"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            placeholder="••••••••"
            type="password"
            required
            name="password"
          />
        </div>
        <div className="mb-8">
          <label htmlFor="role">Select Role</label>
          <select
            required
            className="appearance-none border-b-2 border-violet-500 w-full py-2 px-3 text-neutral-800 dark:text-neutral-300 bg-white dark:bg-black rounded-md focus:outline-none focus:border-violet-600"
            id="role"
            name="role"
            defaultValue=""
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="super admin">Super Admin</option>
          </select>
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing up..." : `Sign up`} &rarr;
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
      <p>
        Already registered?{" "}
        <span className="italic underline">
          <Link href={"/login"}>Login Here</Link>
        </span>
      </p>
    </div>
  );
};

export default Register;
