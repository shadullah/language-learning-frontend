"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Lesson {
  _id: string;
  name: string;
  lessonNum: number;
  vocabularyCount: number;
}

const Lessons = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get("/api/v1/lessons");
        const data = await response.data.data;
        console.log(data);
        setLessons(data);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };

    fetchLessons();
  }, []);
  return (
    <div>
      <h1 className="text-3xl md:text-5xl font-bold text-center mt-12">
        All Lessons
      </h1>
      <div className="main">
        <div className="">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 m-3 md:m-12 p-3 md:p-12">
            {lessons.map((lesson) => (
              <div
                key={lesson._id}
                className="bg-gray-800 text-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">
                    Lesson: {lesson.name}
                  </h2>
                  <p className="text-sm">Lesson No. {lesson.lessonNum}</p>
                  <p className="text-sm">
                    Total Vocabularies: {lesson.vocabularyCount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lessons;
