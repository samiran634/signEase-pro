import React, { useEffect, useState } from "react";
import CardComponent from "./common/card";
import { NavBar } from "./common/NavBar";
import { useNavigate } from "react-router-dom";
import { useUser, RedirectToSignIn, useOrganization } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";

export default function OngoingPage() {
  const navigate = useNavigate();
  const { organization } = useOrganization();
  const { user } = useUser();
  const location = useLocation();
  const orgId = new URLSearchParams(location.search).get("orgId");

  const [pdfData, setPdfData] = useState([]);
  const [pendingContracts, setPendingContracts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loader state

  if (!user) {
    return <RedirectToSignIn />;
  }

  // Fetch PDFs for the organization
  useEffect(() => {
    async function fetchOrgPDFs() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}retrieve_file?orgId=${orgId}`
        );
        const result = await response.json();
        setPdfData(result.files || []);
        console.log("Fetched PDFs:", result.files);
      } catch (err) {
        console.error("Error fetching organization PDFs:", err);
      }
    }

    if (orgId) {
      fetchOrgPDFs();
    }
  }, [orgId]);

  // Fetch pending contracts for this organization
  useEffect(() => {
    const fetchContracts = async () => {
      try {
        if (!organization?.id) return;

        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}get-request?toOrg=${organization.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        console.log("Pending contracts:", data);

        if (res.ok) {
          setPendingContracts(data || []);
        } else {
          console.error("Failed to fetch contracts", data);
        }
      } catch (err) {
        console.error("Error fetching contracts:", err);
      } finally {
        setIsLoading(false); // ✅ stop loader once done
      }
    };

    fetchContracts();
  }, [organization?.id]);

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
    <div className="main-container w-screen h-screen bg-white relative overflow-x-hidden mx-auto my-0 px-6">
      <NavBar siteName="signEase" navItems={navItems} />

      {isLoading ? (
        <div className="flex justify-center items-center h-screen text-black text-xl font-semibold">
          <img src="/loader.svg" alt="Loading..." className="w-12 h-12 animate-spin mr-4" />
          Loading contracts...
        </div>
      ) : pdfData.length === 0 ? (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <p className="text-black text-2xl font-bold mb-4 text-center">
            Please join an organization and upload your first contract
          </p>
          <img src="/no-data-concept-illustration.avif" alt="No data" className="w-[300px]" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pdfData.map((pdf, index) => {
            const isPendingMatch = pendingContracts.some(
              (contract) => contract.fileCid === pdf.cid
            );

            return (
              <CardComponent
                key={index}
                TitleText={pdf.name}
                SubtitleText={pdf.created_at}
                orgName={organization.id}
                cid={pdf.cid}
                isPending={isPendingMatch}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
