import React, { useEffect, useState } from "react";
import axios from "axios";
import CardComponent from "./common/card";
import { NavBar } from "./common/NavBar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser, RedirectToSignIn } from "@clerk/clerk-react";
import { useOrganization } from "@clerk/clerk-react";
import { PinataSDK } from "pinata";
 
const pinata = new PinataSDK({
  pinataJwt: import.meta.env.VITE_JWT,
  pinataGateway: import.meta.env.VITE_GATEWAY_URL
})
export default function OngoingPage() {
  const navigate = useNavigate();
  const organization = useOrganization().organization;
  const orgCode=organization.id;
  const { user } = useUser();
  const [pdfData, setPdfData] = useState([]);
  const  orgId=new URLSearchParams(this.props.location.search).get("orgId");
  
  if (!user) {
    return <RedirectToSignIn />;
  }

useEffect(() => {
  //it is taking all the files that belongs to certain organization
  async function fetchOrgPDFs() {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}retrive_files?orgCode=${orgId}`)
      const result = await response.json()


      setPdfData(result.json);
      console.log(pdfData);
    } catch (err) {
      console.error("Error fetching organization PDFs:", err)
    }
  }

  fetchOrgPDFs()
}, [])

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
               TitleText={pdf.metadata.name}  // Using dynamic title from API response
              
              orgName={organization.id}
              Indecator={pdf._id}
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
