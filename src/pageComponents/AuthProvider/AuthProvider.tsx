import { authSelector } from "@/reducer";
import React from "react";
import { useSelector } from "react-redux";

const AuthContext = React.createContext(null);
const { Provider } = AuthContext;

interface Props {
  children?: JSX.Element;
}

const AuthProvider = ({ children }: Props) => {
  const { user } = useSelector(authSelector);

  // checks if the user is authenticated or not
  const isUserAuthenticated = () => {
    if (!user) {
      return false;
    }
  };

  return (
    <Provider
      //@ts-ignore
      value={{
        isUserAuthenticated,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
