import { useOrganization } from "@clerk/clerk-react";
import { useStorage } from "@liveblocks/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "./common/NavBar";
const RequestForSignature = () => {
  const { organization } = useOrganization();
  const navigate = useNavigate();
  const [pendingContracts, setPendingContracts] = useState([]);
 const contracts = useStorage((root) => root.contracts || []);


  useEffect(() => {
    if (!organization) return;
    const orgId = organization.id;
    if(contracts!=null&&contracts.length>0){
         const filtered = contracts.filter(
      (contract) => contract.toOrg === orgId && !contract.signed
    );
    setPendingContracts(filtered);
    }
   
  }, [contracts, organization]);

  const handleRead = (cid) => {
    navigate({ pathname: "/read", search: `?url=${import.meta.env.VITE_GATEWAY_URL}/${cid}` });
  };

  const handleSign = (cid) => {
    navigate({ pathname: "/sign", search: `?cid=${cid}` });
  };
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
  return (
    <>
    
             <NavBar siteName="signEase" navItems={navItems} />
    <div className="flex justify-center p-6 bg-gray-600">
      <h1 className="text-xl font-bold mb-4">Incoming Contract Signature Requests</h1>
      {pendingContracts.length === 0 ? (
        <> 
        <img src="/gifs/fiinding_request.gif" alt="no signature"/>
           <p className="text-black">No signature requests .</p>
        </>
     
      ) : (
        <ul className="space-y-4">
          {pendingContracts.map((contract, index) => (
            <li
              key={index}
              className="border p-4 rounded shadow hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold">{contract.title}</h2>
              <p className="text-sm text-gray-600 mb-2">
                From: <strong>{contract.fromOrg}</strong>
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleRead(contract.fileCid)}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  View Contract
                </button>
                <button
                  onClick={() => handleSign(contract.fileCid)}
                  className="px-3 py-1 bg-green-600 text-white rounded"
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
