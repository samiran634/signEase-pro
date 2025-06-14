const FirstFeature = () => {
  return (
    <div className="bg-amber-50 py-16">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        
        {/* Text Section */}
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-600 mb-2">Simplify</p>
          <h1 className="text-4xl font-serif font-bold text-gray-900 leading-tight mb-6">
            Transform Your <br />
            Paperwork with <br />
            Digital Signatures
          </h1>
          <p className="text-gray-700 text-lg mb-6">
            Our digital signature feature streamlines the signing process, making paperwork effortless. Say goodbye to tedious printing and scanning—sign documents directly on your device.
          </p>

          {/* Bullet Points */}
          <ul className="text-gray-700 space-y-2 mb-6">
            <li>• Effortless signing from anywhere, anytime.</li>
            <li>• Reduce paperwork hassle and enhance productivity.</li>
            <li>• Secure and legally binding electronic signatures.</li>
          </ul>

          {/* Buttons */}
          <div className="flex gap-4">
            <button className="bg-[#d6d6b3] text-black px-5 py-2 rounded-full font-medium shadow-sm hover:brightness-95 transition">
              Learn More
            </button>
           
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-1">
          <img
            src="/images/feature1.png"
            alt="Digital Signature Feature"
            className="rounded-lg shadow-md w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default FirstFeature;
