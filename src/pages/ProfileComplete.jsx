import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function ProfileComplete() {
  const { user } = useAuth();

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  async function saveProfile() {
    if (!/^[0-9]{10}$/.test(phone)) {
      alert("Enter valid 10 digit number");
      return;
    }

    setLoading(true);

    try {
      await fetch(
        "https://solarsync-admin.vercel.app/api/customer/complete-profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            phone: `+91${phone}`,
          }),
        }
      );

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to save");
    }

    setLoading(false);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <h1>Complete Profile</h1>

        <input
          type="tel"
          placeholder="9876543210"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          onClick={saveProfile}
          disabled={loading}
        >
          Save
        </button>
      </div>
    </div>
  );
}