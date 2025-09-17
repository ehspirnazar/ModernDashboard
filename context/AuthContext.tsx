"use client";
import React, { createContext, useState, useEffect, useContext } from "react";

type Profile = {
  name: string;
  image: string;
  email?: string;
};

type AuthContextType = {
  token: string | null;
  profile: Profile | null;
  login: (token: string) => void;
  logout: () => void;
  updateProfile: (profile: Profile) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: any }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) {
      setToken(t);

      // load profile for this token
      const saved = localStorage.getItem(`profile_${t}`);
      if (saved) setProfile(JSON.parse(saved));
    }
  }, []);

  function login(t: string) {
    localStorage.setItem("token", t);
    setToken(t);

    const saved = localStorage.getItem(`profile_${t}`);
    if (saved) {
      setProfile(JSON.parse(saved));
    } else {
      // default profile
      const defaultProfile = {
        name: "New User",
        image: "/default-avatar.png",
        email: "",
      };
      localStorage.setItem(`profile_${t}`, JSON.stringify(defaultProfile));
      setProfile(defaultProfile);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setProfile(null);
  }

  function updateProfile(p: Profile) {
    if (!token) return;
    setProfile(p);
    localStorage.setItem(`profile_${token}`, JSON.stringify(p));
  }

  return (
    <AuthContext.Provider
      value={{ token, profile, login, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
