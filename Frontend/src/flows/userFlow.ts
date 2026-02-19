import { defineFlow } from "fractostate";
import { AuthServices } from "../services/authServices";
import type { User } from "../types";

interface initialeState {
  profile: User | null;
  isLoading: boolean;
  error: string | null;
}

export const UserFlow = defineFlow(
  "user",
  {
    profile: null,
    isLoading: false,
    error: null,
  } as initialeState,
  {
    actions: {
      register: (formData: FormData) => async (ops: any) => {
        ops.self.isLoading._set(true);
        ops.self.error._set(null);

        try {
          const response = await AuthServices.register(formData);

          if (response && response.success) {
            return response.data;
          }
        } catch (error: any) {
          ops.self.error._set(error.message);
          console.log("Erreur dans register de UserFlow: ", error.message);
        } finally {
          ops.self.isLoading._set(false);
        }
      },

      login: (email: string, password: string) => async (ops: any) => {
        ops.self.isLoading._set(true);
        ops.self.error._set(null);

        try {
          const response = await AuthServices.login({ email, password });

          if (response && response.success) {
            localStorage.setItem("token", response.data.token);
            ops.self.profile._set(response.data.user);

            return response.data.user;
          }
        } catch (error: any) {
          ops.self.error._set(error.message);
          console.log("Erreur dans login de UserFlow: ", error.message);
        } finally {
          ops.self.isLoading._set(false);
        }
      },

      getProfil: () => async (ops: any) => {
        ops.self.isLoading._set(true);

        try {
          const response = await AuthServices.userProfile();

          if (response && response.success) {
            ops.self.profile._set(response.data);
          }
        } catch (error: any) {
          ops.self.error._set(error.message);
          console.log("Erreur dans getProfil de UserFlow: ", error);
        } finally {
          ops.self.isLoading._set(false);
        }
      },

      logout: () => (ops: any) => {
        localStorage.removeItem("token");
        ops.self._set({
          profile: null,
          isLoading: null,
          error: null,
        });
      },
    },
  },
);
