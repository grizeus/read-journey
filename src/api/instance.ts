import axios from "axios";

const instance = axios.create({
  baseURL: "https://readjourney.b.goit.study/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const setToken = (token: string) => {
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const clearToken = () => {
  delete instance.defaults.headers.common["Authorization"];
};

export default instance;
