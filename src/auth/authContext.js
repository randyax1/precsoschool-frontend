import { createContext } from "react";

export const AuthContext = createContext({
    user: { auth: false },
    loginUser: () => {},
    logoutUser: () => {},
});