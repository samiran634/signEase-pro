"use client";

import {
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";
import { BrowserRouter, Routes, Route, useSearchParams } from "react-router-dom";

import LandingPage from "./landing-page/home/LandingPage";
import Login from "./landing-page/user/login";
import Dashboard from "./landing-page/user/orgdashboard";
import OrganizationSetup from "./landing-page/user/organization";
import ProfilePage from "./landing-page/user/profile";
import CreateAccount from "./landing-page/user/createAccount";
import SignOutPage from "./landing-page/user/logout";
import MainPage from "./loccked_components/mainpage";
import PreviousPage from "./loccked_components/previous";
import OngoingPage from "./loccked_components/ongoing";
import PdfReadandAsk from "./loccked_components/viewPdf";
 import RequestForSignature from "./loccked_components/request";

import "./App.css";

// 🔁 Wrap Liveblocks Room
const WithRoom = ({ children } ) => {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("orgId") || "default-room";

  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        status: "idle",
        org: roomId,
      }}
    >
      {children}
    </RoomProvider>
  );
};

function App() {
  return (
    <LiveblocksProvider publicApiKey="pk_dev_UamuEGLCfjPdZ4vgprBvMetCMpR9kdkNvl2cL0wyGdRfzuqd-6q2CQOEJfszAa57">
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<SignOutPage />} />
          <Route path="/signup" element={<CreateAccount />} />
          <Route path="/organization" element={<OrganizationSetup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* Routes wrapped with RoomProvider */}
          <Route
            path="/mainpage"
            element={
              <WithRoom>
                <MainPage />
              </WithRoom>
            }
          />
          <Route
            path="/home"
            element={
              <WithRoom>
                <MainPage />
              </WithRoom>
            }
          />
          <Route
            path="/previous"
            element={
              <WithRoom>
                <PreviousPage />
              </WithRoom>
            }
          />
          <Route
            path="/ongoing"
            element={
              <WithRoom>
                <OngoingPage />
              </WithRoom>
            }
          />
          <Route
            path="/read"
            element={
              <WithRoom>
                <PdfReadandAsk />
              </WithRoom>
            }
          />
          <Route
            path="/request"
            element={
              <WithRoom>
                <RequestForSignature />
              </WithRoom>
            }
          />
        </Routes>
      </BrowserRouter>
    </LiveblocksProvider>
  );
}

export default App;
