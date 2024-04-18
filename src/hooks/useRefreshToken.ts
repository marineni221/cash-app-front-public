import { REFRESH_TOKEN_PATH } from 'api/endpoints';
import { useAuth } from './useAuth';
import axios from "api/axios";

export const useRefreshToken = () => {
    const { setToken } = useAuth();

    const refresh = async () => {
        const response = await axios.get(REFRESH_TOKEN_PATH, {
            withCredentials: true,
        });
        console.log('response in refresh token => ', response);
        
        setToken(response.data.accessToken);
        return response.data.accessToken;
    }

    return refresh;
}
