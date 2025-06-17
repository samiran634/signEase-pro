import { useOrganization } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "./common/NavBar";

const RequestForSignature = () => {
  const { organization } = useOrganization();
  const navigate = useNavigate();
  const [pendingContracts, setPendingContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navItems = [
    {
      text: "home",
      onClick: () => navigate("/home"),
      ariaLabel: "home",
    },
    {
      text: "profile",
      onClick: () => navigate("/profile"),
      ariaLabel: "profile",
    },
    {
      text: "About",
      onClick: () => navigate("/about"),
      ariaLabel: "about",
    },
  ];

  useEffect(() => {
    if (!organization) return;

    const fetchContracts = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/get-pending-requests`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ toOrg: organization.id }),
          }
        );

        const data = await res.json();
        if (res.ok) {
          setPendingContracts(data.contracts || []);
        } else {
          console.error("Failed to fetch contracts", data);
        }
      } catch (err) {
        console.error("Error fetching contracts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, [organization]);

  const handleRead = (cid) => {
    navigate({ pathname: "/read", search: `https://violet-absolute-cougar-682.mypinata.cloud/ipfs/${cid}` });
  };

  const handleSign = (cid) => {
    navigate({ pathname: "/sign", search: `?cid=${cid}` });
  };

  return (
    <>
      <NavBar siteName="signEase" navItems={navItems} />
      <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
        <h1 className="text-xl font-bold mb-4">Incoming Contract Signature Requests</h1>
        {loading ? (
          <p>Loading...</p>
        ) : pendingContracts.length === 0 ? (
          <>
            <img src="/gifs/fiinding_request.gif" alt="no signature" className="w-48 mb-4" />
            <p className="text-black">No signature requests.</p>
          </>
        ) : (
          <ul className="space-y-4 w-full max-w-2xl">
            {pendingContracts.map((contract, index) => (
              <li
                key={index}
                className="border p-4 rounded shadow hover:shadow-lg transition bg-white"
              >
                <h2 className="text-lg font-semibold">{contract.title || "Untitled Contract"}</h2>
                <p className="text-sm text-gray-600 mb-2">
                  From: <strong>{contract.fromOrg}</strong>
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleRead(contract.fileCid)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    View Contract
                  </button>
                  <button
                    onClick={() => handleSign(contract.fileCid)}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Sign
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default RequestForSignature;
