import React, { useContext, useState } from "react";

type signin = (email: string, password: string) => void;

export interface AppContextInterface {
  currentUser: string;
  signin: signin;
  logout: () => void;
}

const AuthContext = React.createContext<AppContextInterface | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({children} : {children : React.ReactNode}) {

  const [currentUser, setCurrentUser] = useState("");

  const signin: signin = (email, password) => setCurrentUser(email);
  const logout = () => setCurrentUser("");

  const value: AppContextInterface = {
    currentUser,
    signin,
    logout
  }

  return ( 
    <>
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    </>
   );
}

export default AuthProvider;