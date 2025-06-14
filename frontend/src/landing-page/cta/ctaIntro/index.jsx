const CtaImage = () => {
    return (
        <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
            {/* Background Image */}
            <img
                src="/images/newctaImage.png"
                alt="cta image"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay */}
           <div className="absolute inset-0 bg-black/50 flex items-start flex-col justify-start px-8">
            <div className="flex flex-col justify-between">
                    <div className="max-w-xl text-white">
                    <h1 className="text-3xl font-semibold leading-snug mb-2 mt-1.5">
                        Transform Your Document Workflow Today
                    </h1>
                    <p className="mb-4 text-lg text-gray-200">
                        Experience the future of digital signatures with our free trial or request a personalized demo.
                    </p>
                    <div className="flex gap-3">
                        <button className="bg-[#E6E3B9] text-black px-6 py-2 rounded-md hover:bg-yellow-300 transition">
                           Request for free trial 
                        </button>
                        
                    </div>
                </div>
            </div>
            <div className="flex">
           <div className="mt-2">
                <h2 className="text-2xl font-bold   text-gray-300">Facing trouble creating an account?</h2>
                 <p className="text-gray-300 mb-4">Watch this quick tutorial to get started.</p>
                    <div className="relative w-full aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                            <iframe
                        className="w-full h-48 rounded-lg"
                        src="https://www.youtube.com/embed/JsHUK0GpVEY?si=zBa_NA-l11Ig7sHx"
                        title="Tutorial Video"
                        allowFullScreen> </iframe>
          </div>
        </div>
            </div>
            </div>
        </div>
    );
};

export default CtaImage;
