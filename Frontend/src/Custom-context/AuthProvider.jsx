import React, { createContext, useContext, useState, useEffect } from "react";
import { useFetch } from "../customHooks/useFetch";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { data, error, loading } = useFetch(
    `${import.meta.env.VITE_URL_API}/users/loggedIn-user`
  );

  const [loggedInUserData, setLoggedInUserData] = useState(null);

  useEffect(() => {
    setLoggedInUserData(data);
  }, [data]);   // save the current and updated state of user 

  const LogoutUser = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_URL_API}/users/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Logout failed");

      // Clear auth state
      setLoggedInUserData(null);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loggedInUserData,
        loggedInUserError: error,
        loggedInUserLoading: loading,
        LogoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
