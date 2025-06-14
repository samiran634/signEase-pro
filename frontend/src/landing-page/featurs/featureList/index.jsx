import { useNavigate } from "react-router-dom";
const FeatureList = () => {
    const navigate=useNavigate();
    return (
        <div className="bg-black text-white px-8 py-12">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
                {/* Left Section - Main Text */}
                <div>
                    <p className="text-sm font-semibold uppercase mb-2 text-gray-300">Secure</p>
                    <h1 className="text-4xl font-semibold leading-snug mb-4">
                        Effortless Digital <br /> Signatures for <br /> Your Organization
                    </h1>
                    <p className="text-gray-300 mb-6">
                        Our platform ensures top-notch security for all your documents, keeping your data safe and confidential.
                        Enjoy seamless integration with existing tools to streamline your workflow.
                    </p>
                    <div className="flex gap-4">
                        <button className="px-5 py-2 border border-white rounded-full hover:bg-white hover:text-black transition">
                            Learn More
                        </button>
                        <button onClick={()=>{navigate("/signup")}} className="underline text-white hover:text-gray-300 transition">
                            Sign Up →
                        </button>
                    </div>
                </div>

                {/* Right Section - Features Grid */}
                <div className="grid sm:grid-cols-2 gap-8">
                    <div>
                        <div className="text-2xl mb-2">♿</div>
                        <h3 className="font-bold mb-1">User-Friendly Interface for All Experience Levels</h3>
                        <p className="text-gray-400 text-sm">
                            Navigate effortlessly with our intuitive design.
                        </p>
                    </div>

                    <div>
                        <div className="text-2xl mb-2">👥</div>
                        <h3 className="font-bold mb-1">Robust Integration Capabilities for Enhanced Productivity</h3>
                        <p className="text-gray-400 text-sm">
                            Connect with your favorite apps and tools seamlessly.
                        </p>
                    </div>

                    <div>
                        <div className="text-2xl mb-2">🔒</div>
                        <h3 className="font-bold mb-1">Advanced Security Features for Peace of Mind</h3>
                        <p className="text-gray-400 text-sm">
                            Protect your contracts with industry-leading encryption.
                        </p>
                    </div>

                    <div>
                        <div className="text-2xl mb-2">💡</div>
                        <h3 className="font-bold mb-1">AI Assistance for Simplified Contract Understanding</h3>
                        <p className="text-gray-400 text-sm">
                            Get insights and highlights to make informed decisions.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeatureList;
