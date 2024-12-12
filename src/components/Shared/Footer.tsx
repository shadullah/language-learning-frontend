import React from "react";

const Footer = () => {
  return (
    <div className="bg-orange-400 p-3 md:p-12">
      <div className="px-6 md:px-24">
        <div className="block md:flex justify-center space-x-12 md:space-x-24">
          <div>
            <h1>Additional Links</h1>
          </div>
          <div>
            <h1 className="mb-6">Information</h1>
            <p>
              <a href="https://shadullah.vercel.app/">Portfolio</a>
            </p>
            <p>
              <a href="https://github.com/shadullah">Github</a>
            </p>
          </div>
        </div>
        <div className="text-center mt-12">
          <p>Copyright &copy; Reserved by 2024</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
