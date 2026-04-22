import React, { useState } from "react";
import { Mail, Phone, ShieldCheck, Loader2, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ContactForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Validation
  const validate = () => {
    let newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Enter valid email";
    }

    if (!formData.phone) {
      newErrors.phone = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Enter valid Indian number";
    }

    return newErrors;
  };

  // ✅ SINGLE Submit Function (Backend Connected)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setSuccess("");

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed");
      }

      setSuccess("Contact details verified successfully!");

      // Navigate after success
      setTimeout(() => {
        navigate("/payment");
      }, 1000);

    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto bg-white rounded-xl shadow border border-gray-200 overflow-hidden">

      {/* Header */}
      <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-green-600" />
          <span className="text-xs font-bold text-gray-700 uppercase">
            Contact Information
          </span>
        </div>
        <span className="text-xs text-gray-400">Step 1 of 2</span>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">

        <div className="grid md:grid-cols-2 gap-6">

          {/* Email */}
          <div>
            <label className="text-sm font-semibold text-gray-600 flex items-center gap-2 mb-1">
              <Mail className="w-4 h-4" /> Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. alex@gmail.com"
              className={`w-full border rounded-lg px-4 py-2 text-sm outline-none 
              ${errors.email ? "border-red-500" : "border-gray-300"}`}
            />

            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-semibold text-gray-600 flex items-center gap-2 mb-1">
              <Phone className="w-4 h-4" /> Mobile Number
            </label>

            <div className="flex">
              <span className="px-3 flex items-center bg-gray-100 border border-r-0 rounded-l-lg text-sm">
                +91
              </span>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="9876543210"
                className={`w-full border rounded-r-lg px-4 py-2 text-sm outline-none 
                ${errors.phone ? "border-red-500" : "border-gray-300"}`}
              />
            </div>

            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

        </div>

        {/* Success */}
        {success && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-sm">
            <CheckCircle className="w-4 h-4" />
            {success}
          </div>
        )}

        {/* Footer */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

          <p className="text-xs text-gray-500 max-w-sm">
            By continuing, you agree to receive booking confirmation via Email & SMS.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-900 flex items-center justify-center gap-2 min-w-[150px]"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Confirm Details"
            )}
          </button>

        </div>
      </form>
    </section>
  );
}