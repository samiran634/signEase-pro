
import { useRef } from "react";

const HeroSection=(props)=>{
    console.log(props)
      const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setFeatureDropdownOpen(false)
  };
    return (

        <>
            <div className="flex mt-0   bg-amber-50">
              <div className="lg:w-[80%] lg:ml-22">
                    <div className="flex flex-row justify-between  mt-16 ml-12">
                        <div className="  drop-shadow-xs">
                                {/*main kotha*/}
                                <h1 className=" text-4xl sm:text-3xl">Streamline Your Worldflow <br /> with Digital Signature</h1>
                        </div>
                        <div className="w-[45%] lg:pr-4 lg:mr-5 hidden md:block ">
                                {/*paragraph*/}
                                Signease revolutionizes the way you handle documents by eleminating tedious paperwork. Experience the ease of managing contracts with out AI assistant that highlights key details and simplifies negotiations.
                             <div className="flex flex-row gap-3 mt-2.5" >
                                    <button onClick={()=>scrollToSection(props.ref)} className="bg-[#d6d6b3] text-black px-4 py-2 rounded-full font-medium shadow-sm hover:brightness-95 transition">
                                      Join
                                    </button>

                                    <button className="bg-white text-black px-4 py-2 rounded-full border border-black font-medium hover:bg-black hover:text-white transition">
                                       Learn More
                                    </button>
                            </div>

                        </div>
                    </div>
                <div className="mt-12 flex justify-center ">
                    {/*image*/}
                        <img src="/images/hero.png" alt="hero image" /> 
                </div>
              </div>
            </div>
        
        
        </>
    )
}
export default HeroSection