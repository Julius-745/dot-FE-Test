"use client";
import { useState } from "react";
import axios from "axios";

export const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/", { email, password });
      if (response.data.status === "success") {
        localStorage.setItem("user", JSON.stringify(response.data.data));
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.setItem("myState", JSON.stringify(null));
  };

  return {
    login,
    logout,
    loading,
    error,
  };
};
