import React from "react";

const IndividualLesson = ({ params }: any) => {
  const { id } = params;
  console.log(id);
  return (
    <div>
      <h1>Individual lesson</h1>
    </div>
  );
};

export default IndividualLesson;
