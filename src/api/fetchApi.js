import axios from "axios";

const axiosConfig = {
    method: "GET",
    baseURL: import.meta.env.VITE_API_URL,
    headers: {},
};

async function fetchApi(apiParams) {
    try {
        if (apiParams.accessToken) {
            axiosConfig.headers.Authorization = "Bearer " + apiParams.accessToken;
        }
        const result = await axios({
            ...axiosConfig,
            ...apiParams,
        });
        return result.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

export default fetchApi;