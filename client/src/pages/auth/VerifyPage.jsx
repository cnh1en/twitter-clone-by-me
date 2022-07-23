import React from "react";

const VerifyPage = ({ name }) => {
  const handleVerify = () => {
    window.open("https://mail.google.com");
  };
  return (
    <div className="grid place-items-center h-screen w-full bg-gray-200">
      <div className="w-[500px] h-[60%] shadow-xl p-6 rounded-xl bg-white">
        <span>
          <i className="text-twitter ri-twitter-fill text-[48px]"></i>
        </span>

        <div className="space-y-6">
          <p>
            Hi <span className="font-bold">{name}!</span> <br />
            We're happy you signed up for Twitter. To start exploring Twitter,
            please confirm your email address.
          </p>

          <button
            className="px-4 py-2 rounded-full bg-twitter text-white hover:bg-opacity-70"
            onClick={handleVerify}
          >
            Verify Now
          </button>

          <div>
            <p>Welcome!</p>
            <span>cnh1en</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;
