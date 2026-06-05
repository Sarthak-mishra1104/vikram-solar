import { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });

    return () => unsub();
  }, []);
const result = await signInWithPopup(
  auth,
  googleProvider
);

const user = result.user;

try {
  await fetch(
    "https://solarsync-admin.vercel.app/api/customer",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      }),
    }
  );
} catch (error) {
  console.error(
    "Customer save failed:",
    error
  );
}

return result;
  const loginWithGoogle = async () => {
    try {
      
    } catch (error) {
      console.error(
        "Google Login Error:",
        error
      );

      throw error;
    }
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithGoogle,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);