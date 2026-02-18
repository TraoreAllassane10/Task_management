import api from "../api/api";

export const AuthServices = {
  register: async (data: any) => {
    return await api.post("/register", data).then((res) => res.data);
  },

  login: async (data: any) => {
    return await api.post("/login", data).then((res) => res.data);
  },

  userProfile: async () => {
    return await api.get("/user/profil").then((res) => res.data);
  },
};
