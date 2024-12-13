"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Tutorial {
  _id: string;
  name: string;
  link: string;
  email: string;
}

const Tutorials = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const response = await axios.get("/api/v1/tutorials");
        const data = await response.data.data;
        console.log(data);
        setTutorials(data);
      } catch (error) {
        console.error("Error fetching Tutorials:", error);
      }
    };

    fetchTutorials();
  }, []);

  const getYouTubeVideoId = (url: string) => {
    const urlObj = new URL(url);
    return urlObj.searchParams.get("v");
  };

  return (
    <div>
      <h1 className="text-3xl md:text-5xl font-bold text-center mt-12">
        All Tutorials
      </h1>
      <div className="main">
        <div className="">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 m-3 md:m-12 p-3 md:p-12">
            {tutorials.map((tutorial) => (
              <div
                key={tutorial._id}
                className="bg-gray-800 text-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <div className="p-4">
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                      tutorial.link
                    )}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-64"
                  ></iframe>
                  <h2 className="text-xl font-semibold mb-2">
                    {tutorial.name}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorials;
