import axios from "axios";

let baseUrl = "http://localhost:3000/";

const ApiHeader = axios.create({
  baseURL: baseUrl,
});
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
    const { data } = await ApiHeader.post("api/login", { username, password });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const register = async (username: string, password: string, email: string) => {
  try {
     await ApiHeader.post("/api/register", { username, password, email});

    } catch (err: any) {
      if (axios.isAxiosError(err)) {
      const status = err.response?.status;
      const message = err.response?.data;

      if((status === 409)){
        
        if (message === "Profile with this email already exists" || message ===  "Profile with this username already exists" ){
          alert(message)
        }
      }

    }
      console.log("registration error")
    }
};

export const wHistory = async (token:string) => {
  try {
    const { data } = await ApiHeader.get("api/whistory", {headers: { Authorization: "Bearer " + token,},
    });
    return (data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getWallet = async (token: string) => {
  try {
    const { data } = await ApiHeader.get("api/wallet", { headers: { Authorization: "Bearer " + token },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getQuestion = async (questionId: number) => {
  try {
    const { data } = await ApiHeader.get(`/api/questions/${questionId}`);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAnswers = async (questionId: number) => {
  try {
    const { data } = await ApiHeader.get(`/api/questions/${questionId}/answers`);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
