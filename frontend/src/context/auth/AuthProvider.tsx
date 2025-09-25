import { useState, type PropsWithChildren } from "react";
import { AuthContext } from "./AuthContext";
import type { ILoginForm, IRegisterForm } from "../../types/Auth";
import { BASE_URL } from "../../constants/baseUrl";     
 ///control center tht keeps track of who  logged in 
// function to register,login and logout 
// shares this information with all pages 

const AuthProvider = (props: PropsWithChildren) => {
  const [username, setUsername] = useState<string | null>(// current login state
    localStorage.getItem("username")/// loads previous login info 
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const register = async (formData: IRegisterForm) => {
    try {
      const res = await fetch(`${BASE_URL}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      return await handleFetchResult(res, formData);
    } catch (error) {
      console.error(error);
      return ["Something wrong in the server! Please try again later"];
    }
  };

  const login = async (formData: ILoginForm) => {
    try {
      const res = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      return await handleFetchResult(res, formData);
    } catch (error) {
      console.error(error);
      return ["Something wrong in the server! Please try again later"];
    }
  };

  const handleFetchResult = async ( //processes response from the backend
    res: Response,
    formData: IRegisterForm | ILoginForm
  ) => {
    const data = await res.json();

    if (res.ok) {
      setToken(data.token);
      setUsername(formData.email);
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", formData.email);
      return null;
    }

    const errorsMsg: string[] = [];

    if (res.status === 400) {
      data.error.details.map((err: { msg: string }) => errorsMsg.push(err.msg));
      return errorsMsg;
    }

    errorsMsg.push(data.message);
    return errorsMsg;
  };

  const logout = () => {//clears token and username frm state and local storage 
    setToken(null);
    setUsername(null);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider value={{ token, username, login, register, logout }}>
      {props.children}
    </AuthContext.Provider>//makes all values available to  every component in app
  );
};

export default AuthProvider;
