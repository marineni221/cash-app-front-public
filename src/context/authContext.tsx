/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { User } from "models/User";
import React, { useState, useMemo, Dispatch, SetStateAction } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextProps {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  user: User,
  setUser: Dispatch<SetStateAction<User>>;
  connexionExpired: boolean,
  setConnexionExpired: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = React.createContext<AuthContextProps>({
  token: "",
  setToken: () => {},
  user: {firstname: "", lastname: "", phone: "", email: ""},
  connexionExpired: false,
  setUser: () => {},
  setConnexionExpired: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({firstname: "", lastname: "", phone: "", email: ""});
  const [token, setToken] = useState("");
  const [connexionExpired, setConnexionExpired] = useState(false);
  const memoizedAuth = useMemo(
    () => ({ user, setUser, token, setToken, connexionExpired, setConnexionExpired }),
    [token, connexionExpired, user]
  );

  return (
    <AuthContext.Provider value={memoizedAuth}>
      {children}
    </AuthContext.Provider>
  );
};
