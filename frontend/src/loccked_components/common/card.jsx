import React, { useState, useEffect } from "react";
import { useOrganizationList, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const CardComponent = ({ TitleText, SubtitleText, cid }) => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [filteredOrgs, setFilteredOrgs] = useState([]);
  const [link, setLink] = useState("");
  const { organization } = useUser();
  const { userMemberships, isLoaded } = useOrganizationList();

  useEffect(() => {
    // Set link safely when cid changes
    if (cid) {
      setLink(`${import.meta.env.VITE_GATEWAY_URL}/${cid}`);
    }
  }, [cid]);

  const handleReadMore = () => {
    if (link) {
      navigate({ pathname: "/read", search: `?url=${encodeURIComponent(link)}` });
    }
  };

  const handleRequestClick = () => {
    if (isLoaded && userMemberships?.length > 0) {
      const otherOrgs = userMemberships
        .map((m) => m.organization)
        .filter((org) => org.id !== organization?.id);
      setFilteredOrgs(otherOrgs);
    }
    setIsClicked(true);
  };

  const handleClosePopup = () => {
    setIsClicked(false);
    setFilteredOrgs([]);
  };

  return (
    <div className="relative">
      <div className="bg-white w-full sm:w-60 p-4 rounded-xl transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
        <img
          className="rounded-xl object-cover h-40 w-full"
          src="/images/cool_background.png"
          alt="Background"
        />
        <div className="p-2">
          <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            {TitleText || "Noteworthy technology acquisitions 2021"}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-sm">
            {SubtitleText || "Biggest enterprise technology acquisitions of 2021."}
          </p>

          <div className="flex flex-col gap-2">
            <button
              className="w-full flex justify-center items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800"
              onClick={handleReadMore}
              disabled={!link}
            >
              view file
              <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </button>

            <button
              className="w-full flex justify-center items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800"
              onClick={handleRequestClick}
            >
              request organization for e-signature
              <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Popup Overlay */}
      {isClicked && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-xl p-6 shadow-xl w-full max-w-xl relative">
            <button
              className="absolute top-2 right-3 text-gray-600 hover:text-black"
              onClick={handleClosePopup}
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-4">Select Organization</h2>
            {filteredOrgs.length > 0 ? (
              <ul className="space-y-2 max-h-[300px] overflow-y-auto">
                {filteredOrgs.map((org) => (
                  <li key={org.id} className="p-2 border rounded">
                    {org.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No other organizations available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardComponent;
