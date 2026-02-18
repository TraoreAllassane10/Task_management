import api from "../api/api";

export const AuthServices = {
  register: async (data: any) => {
    try {
      return await api.post("/register", data).then((res) => res.data);
    } catch (error) {
      console.log("Erreur lors de la creation de l'utilisateur : ", error);
    }
  },

  login: async (data: any) => {
    try {
      return await api.post("/login", data).then((res) => res.data);
    } catch (error) {
      console.log("Erreur lors l'authentification de l'utilisateur : ", error);
    }
  },

  userProfile: async () => {
    try {
      return await api.get("/user/profil").then((res) => res.data);
    } catch (error) {
      console.log("Erreur lors de la recuperation du profil de l'utilisateur : ", error);
    }
  },
};
