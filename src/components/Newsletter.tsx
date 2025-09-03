import React, { useState } from "react";

interface NewsletterProps {
  variant?: "hero" | "footer";
}

const Newsletter: React.FC<NewsletterProps> = ({ variant = "footer" }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    consent: false,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://api.primefocususa.com/api/waitlist/join",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: "", // Optional for newsletter
            email: formData.email,
            consent: formData.consent,
            source: "newsletter"
          }),
        }
      );

      if (response.ok) {
        setSuccess(true);
        setFormData({ firstName: "", email: "", consent: false });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to join newsletter");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  if (variant === "hero") {
    return (
      <div className="bg-white text-slate-900 p-6 rounded-lg">
        <div className="bg-yellow-500 text-slate-900 text-sm font-bold px-3 py-1 rounded-full inline-block mb-3">
          Opening Soon
        </div>
        <h3 className="font-semibold mb-2">
          Prime Focus C.A.F.E. is launching soon!
        </h3>
        <p className="text-slate-600 mb-4">
          Join the waitlist for exclusive offers and updates.
        </p>

        {success ? (
          <div className="text-green-600 font-medium">
            Successfully joined the waitlist!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
            />
            <label className="flex items-center space-x-2 text-xs">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleInputChange}
                required
                className="rounded"
              />
              <span>I agree to receive marketing emails</span>
            </label>
            {error && <p className="text-red-600 text-xs">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-400 text-slate-900 px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
            >
              {loading ? "Joining..." : "Join the Waitlist"}
            </button>
          </form>
        )}
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Stay updated</h3>
      {success ? (
        <div className="text-green-600 font-medium">
          Successfully subscribed!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="flex-1 px-4 py-2 rounded-l-lg text-slate-900 border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-400 text-slate-900 px-4 py-2 rounded-r-lg font-semibold transition-colors"
          >
            {loading ? "..." : "Subscribe"}
          </button>
        </form>
      )}
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default Newsletter;
