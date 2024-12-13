"use client";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const TutorialPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);

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

      if (res.status === 200) {
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
      <h1>Tutorial page</h1>
      <form className="my-8 " onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            placeholder="Project Name"
            type="text"
            name="name"
            required
            className="text-black"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="link">Link</label>
          <input
            id="link"
            name="link"
            placeholder="https://example.com"
            className="text-black"
            type="url"
            required
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button className="w-24 bg-violet-400" type="submit">
          {loading ? "Adding..." : "Add"} &rarr;
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
    </div>
  );
};

export default TutorialPage;
