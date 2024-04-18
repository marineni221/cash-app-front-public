import { AuthContext } from "context/authContext";
import { useContext } from "react";

export const useAuth = () => {
    const { token, setToken, user, setUser, connexionExpired, setConnexionExpired } = useContext(AuthContext);
    return { token, setToken, user, setUser, connexionExpired, setConnexionExpired };
};