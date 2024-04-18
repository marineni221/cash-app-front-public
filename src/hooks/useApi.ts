import { useAuth } from "./useAuth";
import { useAxiosInterceptor } from "./useAxiosInterceptor";
import { useRefreshToken } from "./useRefreshToken";

export const useApi = () => {
    const {setConnexionExpired} = useAuth();
    const refresh = useRefreshToken();
    const axiosInterceptor = useAxiosInterceptor();

    async function post<T>(path: string, dataForm: T) {
        try {
            const jsonResponse = await axiosInterceptor.post(path, dataForm);
            return jsonResponse;
        } catch (error: any) {
            if (error?.response?.status === 403) {
                await refresh();
            }
            throw new Error(error);
        }
    }

    async function get(path: string) {
        try {
            const jsonResponse = await axiosInterceptor.get(path);
            return jsonResponse;
        } catch (error: any) {
            console.log('in get method of useApi => ', error?.response?.status);
            if (error?.response?.status === 403) {
                await refresh();
                get(path);
            } else if (error?.response?.status === 401) {
                setConnexionExpired(true);
            }
        }
    }

    return { post, get };
};
