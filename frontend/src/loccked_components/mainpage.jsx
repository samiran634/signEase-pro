import { useEffect, useState } from "react";
import { NavBar } from "./common/NavBar";
import { useUser, RedirectToSignIn, useOrganization } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import FileUpload from "./utils/pinata";

const MainPage = () => {
  const { user } = useUser();
  const { organization, isLoaded } = useOrganization();
  const navigate = useNavigate();

  const [orgId, setOrgId] = useState(null);
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);

  const orgCode = organization?.id;

  useEffect(() => {
    if (!orgCode) return;

    const fetchOrgId = async () => {
      try {
        const baseUrl = import.meta.env.VITE_SERVER_URL;

        let res = await fetch(`${baseUrl}identify_org?orgCode=${orgCode}`);
        let data = await res.json();

        if (data.error === "Group not found") {
          res = await fetch(`${baseUrl}create_org?orgCode=${orgCode}`, {
            method: "POST",
          });
          data = await res.json();
        }

        setOrgId(data?.group?.id || null);
        console.log("Resolved orgId:", data?.group?.id);
      } catch (err) {
        console.error("Error handling org setup:", err);
      }
    };

    fetchOrgId();
  }, [orgCode]);

  if (!user) return <RedirectToSignIn />;

  const navItems = [
    { text: "Profile", onClick: () => navigate("/profile"), ariaLabel: "profile" },
    { text: "LogOut", onClick: () => navigate("/logout"), ariaLabel: "logout" },
    { text: "Feedback", onClick: () => navigate("/Feedback"), ariaLabel: "feedback" },
  ];

  const cards = [
    {
      title: "Requests for Signature",
      text: "Want to make deals? See incoming contract requests.",
      path: "/request",
    },
    {
      title: "Previous Contracts",
      text: "Access all your previous signed contracts here.",
      path: "/previous",
    },
    {
      title: "Ongoing Contracts",
      text: "Track contracts in progress and awaiting action.",
      path: `/ongoing?orgId=${orgId}`,
    },
    {
      title: "Add New Contract",
      text: "Drag and drop a new document or upload it.",
      clickAction: () => setUploadModalOpen(true),
    },
  ];

  return (
    <div className="bg-white min-h-screen w-full relative">
      <NavBar siteName="signEase" navItems={navItems} />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
          {/* Illustration */}
          <div className="w-full md:w-1/2">
            <img
              src="/images/human/talk_human.png"
              alt="Human talking"
              className="w-full h-auto object-cover rounded-2xl shadow-md"
            />
          </div>

          {/* Interactive Cards */}
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            {cards.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h2>
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

      {/* Floating Org Button */}
      <button
        className="fixed bottom-8 right-8 w-20 h-20 rounded-full shadow-lg hover:shadow-2xl transition-shadow z-20 bg-white"
        onClick={() => navigate("/dashboard")}
      >
        <img
          src="/images/organization_logo.png"
          alt="organization"
          className="w-full h-full object-cover rounded-full"
        />
      </button>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md mx-auto relative space-y-4">
            <button
              onClick={() => setUploadModalOpen(false)}
              className="absolute top-3 right-3 text-3xl text-gray-500 hover:text-red-600"
              aria-label="Close"
            >
              &times;
            </button>
            {organization ? (
              <FileUpload orgId={orgId} />
            ) : (
              <p className="text-center text-gray-700">
                Please create or join an organization to upload a contract.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
