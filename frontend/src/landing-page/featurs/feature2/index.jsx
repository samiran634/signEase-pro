const SecondFeature = () => {
    return (
        <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-white">
            {/* Image Section */}
            <div className="flex-shrink-0">
                <img src="/images/feature2.png" alt="feature2 image" className="rounded-lg w-full max-w-md" />
            </div>

            {/* Text Section */}
            <div className="max-w-xl">
                <p className="text-sm font-semibold text-gray-600 uppercase mb-2">Simplify</p>
                <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4 leading-snug">
                    Unlock the Power of <br /> AI in Contracts
                </h1>
                <p className="text-gray-700 mb-6">
                    Our AI assistant transforms complex contract details into clear, actionable insights. 
                    Leaders can easily navigate agreements, ensuring they never miss critical information.
                </p>
                <div className="flex gap-4">
                    <button className="px-5 py-2 border border-black rounded-full hover:bg-black hover:text-white transition">
                        Learn More
                    </button>
                     
                </div>
            </div>
        </div>
    );
};

export default SecondFeature;
