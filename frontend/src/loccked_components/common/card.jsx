import React, { useState, useEffect } from "react";
import { useOrganizationList, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { ContractSender } from "../utils/contractpusher";
import { toast } from "react-toastify";

const CardComponent = ({ TitleText, SubtitleText, cid }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { userMemberships, isLoaded } = useOrganizationList({ userMemberships: true });
console.log("CID :",cid);
  const [isClicked, setIsClicked] = useState(false);
  const [filteredOrgs, setFilteredOrgs] = useState([]);
  const [link, setLink] = useState("");
  const [cardImage, setCardImage] = useState("/images/cool_background.png");
  const [display, setDisplay] = useState("flex");

  const [selectedOrg, setSelectedOrg] = useState(null);
  const [contractPayload, setContractPayload] = useState(null);

  // Set link from CID
  useEffect(() => {
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
    if (isLoaded && userMemberships?.data?.length > 0) {
      const currentOrgId = user?.organizationMemberships?.[0]?.organization.id;
      const otherOrgs = userMemberships.data
        .map((m) => m.organization)
        .filter((org) => org.id !== currentOrgId);

      setFilteredOrgs(otherOrgs);
      setIsClicked(true);
    }
  };
 
const handleSendContract = async (targetOrg) => {
  const payload = {
    fromOrg: user?.organizationMemberships?.[0]?.organization.id,
    toOrg: targetOrg.id,
    fileCid:  cid,//how to get the cid form user???
  }

  try {
    const res = await fetch("https://your-backend.vercel.app/api/create-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    const data = await res.json()
    if (res.ok) {
      handleComplete();
      handleClosePopup();
      console.log("Contract sent successfully:", data)
    } else {
      console.error("Error sending contract:", data.error)
    }
  } catch (err) {
    console.error("Network error:", err)
  }
}

  const handleOrgSelection = (targetOrg) => {
    const payload = {
      fromOrg: user?.organizationMemberships?.[0]?.organization.id,
      fileCid: cid,
      title: TitleText,
      subtitle: SubtitleText,
      timestamp: Date.now(),
    };

    setSelectedOrg(targetOrg.id);
    setContractPayload(payload);
  };

  const handleComplete = () => {
    toast.success("Request sent successfully");
    setCardImage("/gifs/request_done.gif");
    setDisplay("hidden");
    setIsClicked(false);
    setFilteredOrgs([]);
    setSelectedOrg(null);
    setContractPayload(null);
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
          src={cardImage}
          alt="Background"
        />
        <div className="p-2">
          <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            {TitleText || "Noteworthy technology acquisitions 2021"}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-sm">
            {SubtitleText || "Biggest enterprise technology acquisitions of 2021."}
          </p>

          <div className={`${display} flex-col gap-2`}>
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
                  <li key={org.id}>
                    <button
                      className="w-full p-2 border rounded cursor-pointer text-left"
                      onClick={() => handleSendContract(org)}
                    >
                      {org.name}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No other organizations available.</p>
            )}
          </div>
        </div>
      )}

      {/* Inject Liveblocks contract sender after selection */}
      {selectedOrg && contractPayload && (
        <ContractSender
          orgId={selectedOrg}
          contractData={contractPayload}
          onComplete={handleComplete}
        />
      )}
    </div>
  );
};

export default CardComponent;
