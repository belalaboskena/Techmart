import { createContext, useEffect, useState } from "react";
import { supabase } from "../supabase";
export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        const redirectPath = sessionStorage.getItem("authRedirect");

        if (redirectPath) {
          sessionStorage.removeItem("authRedirect");
          window.location.hash = redirectPath;
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log("Logout error:", error.message);
      return;
    }
  };
  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://belalaboskena.github.io/Techmart/",
      },
    });

    if (error) {
      console.error("Google login error:", error.message);
    }
  };
  const loginWithFacebook = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
      options: {
        redirectTo: "https://belalaboskena.github.io/Techmart/",
      },
    });

    if (error) {
      console.error("Facebook login error:", error.message);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        logout,
        loginWithGoogle,
        loginWithFacebook,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
