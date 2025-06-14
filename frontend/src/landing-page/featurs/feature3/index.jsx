const ThirdFeature = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between bg-[#3F342F] text-white px-8 py-12 gap-10">
            {/* Left Section (Text + Icons) */}
            <div className="max-w-xl">
                <p className="text-sm font-semibold uppercase mb-2 text-gray-300">Highlight</p>
                <h1 className="text-4xl font-semibold leading-snug mb-4">
                    Streamline Your <br /> Contract Negotiations <br /> Effortlessly
                </h1>
                <p className="text-gray-200 mb-6">
                    Our point highlighter feature simplifies contract negotiation by allowing you to easily identify key sections.
                    This ensures that both parties are on the same page, making the process smoother and more efficient.
                </p>

                {/* Icon Features */}
                <div className="flex flex-col sm:flex-row gap-8 mb-6">
                    <div className="flex items-start gap-4">
                        <span className="text-2xl">💡</span>
                        <div>
                            <h3 className="font-bold mb-1">Easy Identification</h3>
                            <p className="text-gray-300 text-sm">
                                Quickly highlight important clauses for effective discussions and negotiations.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <span className="text-2xl">🖼️</span>
                        <div>
                            <h3 className="font-bold mb-1">Seamless Collaboration</h3>
                            <p className="text-gray-300 text-sm">
                                Send negotiation requests directly to other leaders with just a click.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                    <button className="px-5 py-2 border border-white rounded-full hover:bg-white hover:text-black transition">
                        Learn More
                    </button>
                    
                </div>
            </div>

            {/* Right Section (Image) */}
            <div className="w-full max-w-md">
                <img src="/images/feature3.png" alt="feature3 image" className="rounded-lg w-full" />
            </div>
        </div>
    );
};

export default ThirdFeature;
