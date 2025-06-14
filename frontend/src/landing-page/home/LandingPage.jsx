import { useRef,useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import HeroSection from "../hero";
import FirstFeature from "../featurs/feature1";
import SecondFeature from "../featurs/feature2";
import ThirdFeature from "../featurs/feature3";
import FeatureList from "../featurs/featureList";
import CtaSection from "../cta/ctaMarge";
const LandingPage=()=>{
  const user=useUser().user;
  const navigate=useNavigate();
  const heroRef=useRef(null);
  const ctaRef=useRef(null);
  const featuresRef=useRef(null);
  const footerRef=useRef(null);
  const aboutRef=useRef(null);
  const FirstFeatureRef=useRef(null);
  const SecondFeatureRef=useRef(null);
  const ThirdFeatureRef=useRef(null);
    const [featureDropdownOpen, setFeatureDropdownOpen] = useState(false);
   const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setFeatureDropdownOpen(false)
  };
    useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);
    return (
        <>
       <nav className="bg-zinc-100 shadow-md px-4 py-2">
  <div className="max-w-7xl mx-auto flex items-center justify-between">


    {/* Navigation Links */}
    <div className="md:flex space-x-6 text-sm text-gray-700">
    {/* Logo */}
    <div className="text-lg font-bold text-gray-800">
      Logo
    </div>

<div className="hidden md:flex space-x-6 text-sm text-gray-700 mt-0.86">

      <button  onClick={()=>scrollToSection(heroRef)} className="hover:text-amber-500">Home</button>
      <button onClick={()=>scrollToSection(featuresRef)} className="hover:text-amber-500">About</button>
      {/* Features Dropdown */}
              <div
                className="relative"
                onClick={() => setFeatureDropdownOpen( !featureDropdownOpen)}
                 
              >
                <button className="hover:text-amber-500 mt-1">Features ▾</button>
                {featureDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md text-black z-10">
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-amber-100"
                      onClick={() => scrollToSection(FirstFeatureRef)}
                    >
                      Feature 1
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-amber-100"
                      onClick={() => scrollToSection(SecondFeatureRef)}
                    >
                      Feature 2
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-amber-100"
                      onClick={() => scrollToSection(ThirdFeatureRef)}
                    >
                      Feature 3
                    </button>
                  </div>
                )}
              </div>
            
          

</div>
    </div>

    {/* Auth Buttons */}
    <div className="flex space-x-4 text-sm">
      <button onClick={()=>{navigate("/signup")}}  className=" text-black px-3 py-1 rounded-2xl border-black border-s-2 hover:border-s-0  hover:bg-amber-600">Sign Up</button>
      <button onClick={()=>{navigate("/login")}} className="text-black px-3 py-1 rounded-2xl border-black border-s-2 hover:border-s-0 hover:bg-amber-600">Login</button>
    </div>
  </div>
</nav>

          <main>
        <section ref={heroRef}>
          <HeroSection ref={ctaRef} />
        </section>

        <section ref={aboutRef}>
           <section ref={FirstFeatureRef}>
                <FirstFeature />
           </section>
          <section ref={SecondFeatureRef}>
                <SecondFeature />
          </section>
          <section ref={ThirdFeatureRef}>
                <ThirdFeature />
          </section>
        </section>

        <section ref={featuresRef}>
          <FeatureList />
        </section>

        <section ref={ctaRef}>
          <CtaSection />
        </section>
      </main>
          <footer ref={footerRef} className="bg-black text-white px-6 py-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Logo */}
                <div className="text-3xl font-cursive">Logo</div>

                {/* Navigation Links */}
                <div className="flex flex-wrap gap-6 text-sm justify-center">
                    <a href="#">Get Started</a>
                    <a href="#">Contact Us</a>
                    <a href="#">About Us</a>
                    <a href="#">Support Center</a>
                    <a href="#">Blog Updates</a>
                </div>

                {/* Social Icons */}
                <div className="flex gap-4 text-lg">
                    <a href="#"><i className="fab fa-facebook-f" /></a>
                    <a href="#"><i className="fab fa-instagram" /></a>
                    <a href="#"><i className="fab fa-x-twitter" /></a>
                    <a href="#"><i className="fab fa-linkedin-in" /></a>
                    <a href="#"><i className="fab fa-youtube" /></a>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-600 my-6" />

            {/* Bottom Text */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between text-xs text-gray-400 gap-4 text-center">
                <div>© 2025 Signease. All rights reserved.</div>
                <div className="flex flex-wrap justify-center gap-4">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Cookies Settings</a>
                </div>
            </div>
        </footer>
        </>
    )
};
export default LandingPage