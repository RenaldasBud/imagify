import axios, { Method } from "axios";
const { VITE_APP_BACKEND_URL } = import.meta.env;

interface RequestOptions {
  method?: Method;
  body?: Record<string, unknown>;
  headers?: Record<string, string>;
}

export async function api(url: string, requestOptions: RequestOptions) {
  try {
    const headers = {
      ...requestOptions.headers,
    };

    const response = await axios.request({
      url: VITE_APP_BACKEND_URL + url,

      method: requestOptions.method || "GET",
      data: requestOptions.body,
      headers,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("An unexpected error occurred");
  }
}
