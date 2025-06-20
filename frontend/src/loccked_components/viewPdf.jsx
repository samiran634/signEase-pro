import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
// import ChatbotContainer from "./chatbot_container";
import { NavBar } from "./common/NavBar";
import PdfComp from "./pdfComp";
import { useUser } from "@clerk/clerk-react";
import LiveDiscussionPanel from "./liveBlockChat";
import SignaturePDF from "./utils/signature";
export default function PdfReadandAsk() {
  const [searchParams] = useSearchParams();
  const [isVisible, setVisible] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();

  const url = searchParams.get("url");
const contractId=url.substring(55);
const isSheared=searchParams.get("shear");
console.log(isSheared,typeof(isSheared));
  useEffect(() => {
    if (user === null) {
      navigate("/sign-in");
    }
  }, [user, navigate]);
const handelVisibility=()=>{
  setVisible(false);
}
const handelChange=()=>{

}
  const navItems = [
    { text: "Home", onClick: () => navigate("/home"), ariaLabel: "home" },
    { text: "Profile", onClick: () => navigate("/profile"), ariaLabel: "profile" },
    { text: "About", onClick: () => navigate("/about"), ariaLabel: "about" },
  ];

  return (
    <div className="w-screen h-screen bg-white overflow-hidden">
      {/* Navbar */}
      <nav className="w-full fixed top-0 z-10 backdrop-blur-md shadow-sm">
        <NavBar siteName="SignEase" navItems={navItems} />
      </nav>

      {/* Main Content */}
      <div className="flex w-full h-full pt-20">
        {/* PDF Viewer */}
        <div className="w-full md:w-[70%] h-full overflow-y-auto p-4">
          {url ? (
            <div className="h-full border rounded-xl shadow-md p-2">
              <PdfComp pdfUrl={url} />
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-20">Loading PDF...</p>
          )}
        </div>

        {/* Chatbot */}
        <div className={`w-[30%] hidden md:flex flex-col h-full border-l border-gray-300 bg-gray-50 p-4 transition-all duration-300 ease-in-out`}>
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Contract Discussion</h2>
          <div className="flex-1 overflow-y-auto rounded-lg shadow-inner p-2 bg-white">
           <LiveDiscussionPanel contractId={contractId} pdfUrl={url} />

          </div>
        </div>
      </div>

      {/* Floating CTA Button */}
      {isSheared==="false"&&
      <button
        className="fixed right-6 top-24 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg backdrop-blur rounded-full hover:scale-105 transition-all duration-200 flex items-center gap-2 z-20 cursor-pointer"
        onClick={() => setVisible(true)}
      >
        Confirm Deal
        <svg className="w-4 h-4" viewBox="0 0 14 10" fill="none">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
        </svg>
      </button>}
    {isVisible === true &&  < SignaturePDF onClose={handelVisibility} onConfirm={handelChange} />}

    </div>
  );
}
