"use client";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const TutorialPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, setSuccess] = useState<boolean | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    console.log("Form submitted");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const link = formData.get("link");

    try {
      const res = await axios.post(
        "/api/v1/tutorials",
        { name, link, email: "tabidkhan@gmail.com" },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(res.data);

      if (res.data.status === 200) {
        toast.success("Tutorial added successfully", { duration: 3000 });
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to add tutorial. Please try again.");
      toast.error("Failed to add tutorial", { duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 shadow-md rounded-md">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Add a New Tutorial
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                id="name"
                placeholder="Project Name"
                type="text"
                name="name"
                required
                className="w-full p-3 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-400"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="link"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Link
              </label>
              <input
                id="link"
                name="link"
                placeholder="https://example.com"
                className="w-full p-3 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-400"
                type="url"
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-center text-sm">{error}</p>
            )}

            <button
              type="submit"
              className={`w-full py-3 text-white font-semibold rounded-md transition-all ${
                loading
                  ? "bg-violet-500 cursor-not-allowed"
                  : "bg-violet-400 hover:bg-violet-500"
              }`}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Tutorial"} &rarr;
            </button>

            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default TutorialPage;
