
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function ProfileComplete() {
  const { user } = useAuth();

  const [phone, setPhone] =
    useState("");

  const [city, setCity] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function saveProfile() {
    if (
      !/^[0-9]{10}$/.test(phone)
    ) {
      alert(
        "Enter valid 10 digit mobile number"
      );
      return;
    }

    if (!city.trim()) {
      alert("Enter your city");
      return;
    }

    setLoading(true);

    try {
      const response =
        await fetch(
          "https://solarsync-admin.vercel.app/api/customer",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              email:
                user.email,
              phone: `+91${phone}`,
              city,
              profileCompleted:
                true,
            }),
          }
        );

      const data =
        await response.json();

      console.log(
        "PROFILE SAVED:",
        data
      );

      if (data.success) {
        window.location.reload();
      } else {
        alert(
          "Failed to save profile"
        );
      }
    } catch (error) {
      console.error(error);
      alert(
        "Failed to save profile"
      );
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8">

        <div className="text-center mb-8">

          <div className="text-6xl mb-4">
            ☀️
          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            Complete Profile
          </h1>

          <p className="text-gray-500 mt-2">
            Help us provide
            accurate solar
            consultation
          </p>

        </div>

        <div className="space-y-4">

          <input
            value={
              user?.displayName ||
              ""
            }
            disabled
            className="w-full p-4 rounded-xl border bg-gray-100"
          />

          <input
            value={
              user?.email || ""
            }
            disabled
            className="w-full p-4 rounded-xl border bg-gray-100"
          />

          <input
            type="tel"
            placeholder="Mobile Number"
            value={phone}
            onChange={(e) =>
              setPhone(
                e.target.value
              )
            }
            className="w-full p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            placeholder="City"
            value={city}
            onChange={(e) =>
              setCity(
                e.target.value
              )
            }
            className="w-full p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            onClick={
              saveProfile
            }
            disabled={
              loading
            }
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold p-4 rounded-xl transition"
          >
            {loading
              ? "Saving..."
              : "Continue"}
          </button>

        </div>

      </div>
    </div>
  );
}

