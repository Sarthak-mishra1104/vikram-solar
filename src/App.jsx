
import { AuthProvider, useAuth } from "./hooks/useAuth";
import ChatPopup from "./components/ChatPopup";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BgOrbs from "./components/BgOrbs";
import ToastContainer from "./components/ToastContainer";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import Explorer from "./pages/Explorer";
import Assistant from "./pages/Assistant";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import { ToastContext } from "./hooks/useToast";

function AppContent() {
  const { user, loading } = useAuth();

  const [page, setPage] = useState("home");
  const [toasts, setToasts] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [checkingProfile, setCheckingProfile] = useState(true);

  const showPage = (id) => {
    setPage(id);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const addToast = (
    msg,
    type = "success"
  ) => {
    const id = Date.now();

    setToasts((prev) => [
      ...prev,
      {
        id,
        msg,
        type,
      },
    ]);

    setTimeout(() => {
      setToasts((prev) =>
        prev.filter(
          (t) => t.id !== id
        )
      );
    }, 3500);
  };

  useEffect(() => {
    async function loadCustomer() {
      if (!user) {
        setCheckingProfile(false);
        return;
      }

      try {
        const response =
          await fetch(
            `https://solarsync-admin.vercel.app/api/customer?email=${user.email}`
          );

        const data =
          await response.json();

        console.log(
          "CUSTOMER API:",
          data
        );

        if (data.success) {
          console.log(
  "PROFILE STATUS:",
  data.customer?.profileCompleted
);
          setCustomer(
            data.customer
          );
        }
      } catch (error) {
        console.error(error);
      }

      setCheckingProfile(false);
    }

    loadCustomer();
  }, [user]);

  const pages = {
    home: Home,
    calculator: Calculator,
    explorer: Explorer,
    assistant: Assistant,
    contact: Contact,
    login: Login,
  };

  const PageComponent =
    pages[page] || Home;

  if (loading) {
    return null;
  }

  if (!user) {
    return (
      <ToastContext.Provider
        value={addToast}
      >
        <Login
          showPage={showPage}
        />
        <ToastContainer
          toasts={toasts}
        />
      </ToastContext.Provider>
    );
  }

 if (checkingProfile) {
  return null;
}

  return (
    <ToastContext.Provider
      value={addToast}
    >
      <BgOrbs />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection:
            "column",
        }}
      >
        <Header
          currentPage={page}
          showPage={showPage}
        />

        <main
          style={{ flex: 1 }}
        >
          <AnimatePresence mode="wait">
            <PageComponent
              key={page}
              showPage={showPage}
            />
          </AnimatePresence>
        </main>

        <Footer
          showPage={showPage}
        />
      </div>

      <ToastContainer
        toasts={toasts}
      />

      <ChatPopup />
    </ToastContext.Provider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

