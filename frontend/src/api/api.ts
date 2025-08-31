import axios from "axios";

let baseUrl = "http://localhost:8080/";

const ApiHeader = axios.create({
  baseURL: baseUrl,
});

// Token getter from cookies (dummy implementation, replace with real)
const getTokenFromCookies = (): string | null => {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1] || null;
};

export interface I_AuthHeader {
  headers: {
    Authorization: string;
  };
}

export const authHeader = (): I_AuthHeader => {
  const token = getTokenFromCookies();
  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
};


export const login = async (username: string, password: string) => {
  try {
    const { data } = await ApiHeader.post("api/users/login", { username, password });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


/* export const getSearchWords = async (): Promise<I_Search[]> => {
  try {
    const { data } = await ApiHeader.get("api/search/all", authHeader());
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};*/

