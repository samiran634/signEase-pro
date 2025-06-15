import { useState } from "react";

const MainCta = () => {
  const [value, setValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    const email = value.trim();
    if (!email.endsWith("@gmail.com")) {
      alert("Only Gmail addresses are allowed.");
      return;
    }

    try {
     const body = {
  data: [
    { email }
  ]
};

const res = await fetch(
  "https://sheetdb.io/api/v1/7xux6bhgch3gw",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }
);

      const result = await res.json();
      if (res.ok) {
        alert("Email sent successfully!");
        setValue(""); // Clear input field
      } else {
        alert("Error sending email.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error.");
    }
  };

  return (
    <div className="bg-[#5A5A51] text-white px-6 py-12">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">
          Help us to make better
        </h1>
        <p className="text-gray-200 mb-6">
          If you are a developer then tell us your email and we will contact you
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <input
            type="email"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter your Gmail"
            className="px-4 py-2 rounded-md border border-white bg-transparent placeholder:text-white focus:outline-none focus:ring-2 focus:ring-yellow-200 w-full sm:w-80"
            required
          />
          <button
            type="submit"
            className="bg-[#E6E3B9] text-black px-6 py-2 rounded-md hover:bg-yellow-300 transition"
          >
            Join
          </button>
        </form>

        <p className="text-xs text-gray-300 mt-4">
          By clicking Join, you agree to our Terms and Conditions.
        </p>
      </div>
    </div>
  );
};

export default MainCta;
