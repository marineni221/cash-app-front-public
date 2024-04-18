import { LOGOUT_PATH } from "api/endpoints";
import { useAxiosInterceptor } from "./useAxiosInterceptor";
import { useNavigate } from "react-router";
import { useState } from "react";

export const useLogout = () => {
    const axiosInterceptor = useAxiosInterceptor();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const logout = async () => {
        try {
            setIsLoading(true);
            await axiosInterceptor.post(LOGOUT_PATH);
            setTimeout(() => {
                setIsLoading(false);
                navigate("/login", { state: { from: location }, replace: true });
            }, 1000);
        } catch (error: any) {
            console.log("error response in logout => ", error.response);
        }
    };

    return {logout, isLoading};
};