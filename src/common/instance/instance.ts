import axios from "axios";

const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "618b32a8-3371-4b86-8545-644e338a74c8",
  },
};
export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  ...settings,
});
