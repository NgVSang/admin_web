import { useRouter } from "next/router";
import { useEffect } from "react";

import Home from "@/app/page";
import { useSelector } from "react-redux";
import { authSelector } from "@/reducer";
// import { useToggleModal } from 'hooks/application.hooks'
// import { ApplicationModal } from 'reducers/app.reducer'

export function AuthGuard({ children }: { children: JSX.Element }) {
  const router = useRouter();

  const { user } = useSelector(authSelector);

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user]);

  // if auth initialized with a valid user show protected page
  if (user) {
    return <>{children}</>;
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return (
    <>
      <Home />
    </>
  );
}
