const MainCta = () => {
    return (
        <div className="bg-[#5A5A51] text-white px-6 py-12">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-semibold mb-4">
                    Stay Updated with SignEase
                </h1>
                <p className="text-gray-200 mb-6">
                    Subscribe for the latest news and updates on digital signatures and contract management.
                </p>

                <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="px-4 py-2 rounded-md border border-white bg-transparent placeholder:text-white focus:outline-none focus:ring-2 focus:ring-yellow-200 w-full sm:w-80"
                    />
                    <button
                        type="submit"
                        className="bg-[#E6E3B9] text-black px-6 py-2 rounded-md hover:bg-yellow-300 transition"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-xs text-gray-300 mt-4">
                    By clicking Sign Up, you agree to our Terms and Conditions.
                </p>
            </div>
        </div>
    );
};

export default MainCta;
