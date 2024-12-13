"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Lesson {
  _id: string;
  name: string;
  lessonNum: number;
}

// interface Params {
//   id: string;
// }

const IndividualLesson = () => {
  const { id } = useParams();
  const [singleLesson, setSingleLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`/api/v1/lessons/${id}`);
        const data = response.data?.data;
        console.log(data);
        if (!data) return;
        setSingleLesson(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [id]);
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">{singleLesson?.name}</h1>
      <p className="text-gray-700 text-lg mb-4">
        <strong>Lesson Number:</strong> {singleLesson?.lessonNum}
      </p>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Content</h2>
        {/* <p className="text-gray-800">{singleLesson.content}</p> */}
      </div>
    </div>
  );
};

export default IndividualLesson;
