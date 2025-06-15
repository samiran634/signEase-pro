import { useEffect, useState } from "react";
import { NavBar } from "./common/NavBar";
 
import { useUser, RedirectToSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useOrganization } from "@clerk/clerk-react";
 import FileUpload from "./utils/pinata";

const MainPage = () => {
const { organization, isLoaded } = useOrganization()
const orgCode = organization?.id  
  const [orgId,setOrgId]=useState("");
  const navigate = useNavigate();
  const { user } = useUser();
  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
  if (!isLoaded || !organization) return

  console.log('Org:', organization)
  console.log('Org Code:', organization.id)

  // now call your fetch logic here

}, [isLoaded, organization])
useEffect(() => {
  async function fetchOrgId() {
    try {
      let response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}identify_org?orgCode=${orgCode}`
      )
      let result = await response.json()

      // If group not found, create it
      if (result.error === "Group not found") {
        response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}create_org?orgCode=${orgCode}`,
          { method: 'POST' }
        )
        result = await response.json()
      }

      console.log("Org result:", result)
      setOrgId(result?.group?.id || null)
    } catch (err) {
      console.error("Error fetching or creating organization:", err)
    }
  }

  if (orgCode) {
    fetchOrgId()
  }
}, [orgCode])


   
  if (!user) {
    return <RedirectToSignIn />;
  }

  const navItems = [
    {
      text: "Profile",
      onClick: () => navigate("/profile"),
      ariaLabel: "profile",
    },
    {
      text: "LogOut",
      onClick: () => navigate("/logout"),
      ariaLabel: "about",
    },
    {
      text: "Feedback",
      onClick: () => navigate("/Feedback"),
      ariaLabel: "about",
    },
  ];
  
  return (
    <>
      <div className="bg-white h-[100%] w-[100%] relative mt-0">
        
          <NavBar siteName="signEase" navItems={navItems} />
         
        
 <div className="container mx-auto px-4 py-8">
  <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
    
    {/* Image Section */}
    <div className="w-full md:w-1/2">
      <img 
        src="/images/human/talk_human.png"
        alt="Human talking" 
        className="w-full h-auto object-cover rounded-2xl shadow-md"
      />
    </div>

    {/* Cards Section */}
    <div className="w-full md:w-1/2 flex flex-col gap-6">
      
      {/* Card Component */}
      {[{
        title:"Requests for signature",
        text:"want to make deal with others? Here you can find who wants to make deal with you",
        path:"/requests"
      },
        {
          title: "Previous Contracts",
          text: "You will find all your previous contracts here.",
          path: "/previous",
        },
        {
          title: "Ongoing Contracts",
          text: "You will find all your ongoing contracts here.",
          path: `/ongoing?orgId=${orgId}`,
        },
        {
          title: "Add New Contract",
          text: "Drag and drop a new document or upload it from your device.",
          clickAction: () => setIsClicked(true),
        }
      ].map((item, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h2>
            <p className="text-gray-600 mb-4">{item.text}</p>
            <button
              onClick={item.path ? () => navigate(item.path) : item.clickAction}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Let's Go
            </button>
          </div>
        </div>
      ))}

    </div>
  </div>
</div>

        
        {/* Organization button positioned at bottom right */}
        <button 
          className="fixed bottom-8 right-8 w-20 h-20 rounded-full shadow-lg hover:shadow-2xl transition-shadow z-20 bg-white"
          onClick={() => navigate("/dashboard")}
        >
          <img src="/images/organization_logo.png" alt="organization" className="w-full h-full object-cover rounded-full" />
        </button>

     {/* Popup Modal for Adding New PDF */}
{
  organization === undefined ? (
    <>{/* Shown when organization is undefined */}
      create a new organization
    </>
  ) : (
    isClicked && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md mx-auto relative space-y-4">
       
          <button
            onClick={() => setIsClicked(false)}
            className="absolute top-3 right-3  from-neutral-700 text-3xl  text-gray-500 hover:text-red-600  "
            aria-label="Close"
          >
            &times;
          </button>

         <FileUpload orgId={orgId} />
        </div>
      </div>
    )
  )
}



      </div>
    </>
  );
};

export default MainPage;