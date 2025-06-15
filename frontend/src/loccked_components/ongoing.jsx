import React, { useEffect, useState } from "react";
import axios from "axios";
import CardComponent from "./common/card";
import { NavBar } from "./common/NavBar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser, RedirectToSignIn } from "@clerk/clerk-react";
import { useOrganization } from "@clerk/clerk-react";
import { useLocation } from 'react-router-dom'
 

export default function OngoingPage() {
  const navigate = useNavigate();
  const organization = useOrganization().organization;

  const { user } = useUser();
  const [pdfData, setPdfData] = useState([]);
  const location = useLocation()
const orgId = new URLSearchParams(location.search).get('orgId')
  
  if (!user) {
    return <RedirectToSignIn />;
  }

useEffect(() => {
  async function fetchOrgPDFs() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}retrieve_file?orgId=${orgId}`
      )
      const result = await response.json()

      setPdfData(result.files) // assuming server responds with { files: [...] }
      console.log("Fetched PDFs:", result.files)
    } catch (err) {
      console.error("Error fetching organization PDFs:", err)
    }
  }

  if (orgId) {
    fetchOrgPDFs()
  }
}, [orgId])


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
    <div>
      <div className="main-container w-screen h-screen bg-white relative  overflow-x-hidden mx-auto my-0 px-6 ">
        
          <NavBar siteName="signEase" navItems={navItems} />
   
       {
        pdfData.length === 0 ?(
          <>
          <div className="bg-red w-screen h-screen flex flex-row items-center justify-center">
          <div className="flex justify-center items-center h-screen text-black text-2xl font-bold">
          please join with an organization and upload you first contract
          <div className="flex justify-center items-center h-screen text-black text-2xl font-bold">
          <img src="/no-data-concept-illustration.avif" alt="" />

          </div>
         
            </div>
            
            </div>
       
          </>
          
        ) :(  
          <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  ">
          {pdfData.map((pdf, index) => (
            <CardComponent 
              key={index}
               TitleText={pdf.name}
               SubtitleText={pdf.created_at}
              orgName={organization.id}
              cid={pdf.cid}
            />
          ))}
        </div>
          
          </>
       )
       }
  
   
      </div>
    </div>
  );
}
