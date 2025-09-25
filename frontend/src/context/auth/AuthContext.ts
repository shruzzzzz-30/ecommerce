import { createContext, useContext } from "react";
import type { ILoginForm, IRegisterForm } from "../../types/Auth";

interface IAuthContext {
  username: string | null;
  token: string | null;
  login: (formData: ILoginForm) => Promise<string[] | null>;
  register: (formData: IRegisterForm) => Promise<string[] | null>;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  username: null,
  token: null,
  login: async () => null,
  register: async () => null,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);
