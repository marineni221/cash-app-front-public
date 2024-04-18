import { axiosInterceptor } from "api/axios";
import { useAuth } from "./useAuth";
import React from "react";

export const useAxiosInterceptor = () => {
    const { token } = useAuth();

    React.useEffect(() => {

        const requestInterceptor = axiosInterceptor.interceptors.request
            .use(
                (config) => {

                    if (!config.headers['Authorization']) {
                        config.headers['Authorization'] = `Bearer ${token}`;
                    }
                    console.log('intercepting request => ', config);
                    return config;
                },
                (error) => Promise.reject(error)
            );

        return () => {
            axiosInterceptor.interceptors.request.eject(requestInterceptor);
        }
    }, [token]);

    return axiosInterceptor;
}
