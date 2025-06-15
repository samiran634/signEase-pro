 
import LandingPage from './landing-page/home/LandingPage'
import { Routes,Route,BrowserRouter } from 'react-router-dom'
import Login from './landing-page/user/login'
import Dashboard from './landing-page/user/orgdashboard'
 import OrganizationSetup from './landing-page/user/organization'
 import ProfilePage from './landing-page/user/profile'
 import CreateAccount from './landing-page/user/createAccount'
 import SignOutPage from './landing-page/user/logout'
 import MainPage from './loccked_components/mainpage'
 import PreviousPage from './loccked_components/previous'
 import OngoingPage from './loccked_components/ongoing'
 import PdfReadandAsk from './loccked_components/viewPdf'
 import ResponceOnRequest from './loccked_components/request'
import './App.css'

function App() {
 

  return (
    <>
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
         <Route path="/logout" element={<SignOutPage />} />
        <Route path="/signup" element={<CreateAccount />} />  
        <Route path="/organization" element={<OrganizationSetup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/home" element={<MainPage />} />
        {/* <Route path="/about" element={<AboutPage />} /> */}
        <Route path="/previous" element={<PreviousPage />} />
        <Route path="/ongoing" element={<OngoingPage />} />
        <Route path="/read" element={<PdfReadandAsk />} />
        <Route path="/request" element={<ResponceOnRequest/>}/>
       
      </Routes>
    </BrowserRouter>
     
         
    </>
  )
}

export default App
