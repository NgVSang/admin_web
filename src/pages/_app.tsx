import moment from "moment";
import "moment/locale/vi";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import {
  createContext,
  FC,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { Provider, useSelector } from "react-redux";
import "@/assets/css/globals.css";
import "@/pageComponents/pageStyled/index.styled.css";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "@/store/store";
import { AuthProvider } from "@/pageComponents/AuthProvider";
import { AuthGuard } from "@/pageComponents/auth/AuthGuard";
import Modal from "@/components/molecules/Modal";
import { Toaster } from "react-hot-toast";
import { setHeaderConfigAxios } from "@/services/axios";

moment.locale("vi");

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export const EntryContext = createContext<any>({});
export const SidebarContext = createContext<any>({});

interface Props {
  children?: ReactNode;
}
const Noop: FC = ({ children }: Props) => <>{children}</>;

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const Layout = (Component as any).Layout || Noop;
  const requireAuth = (Component as any).requireAuth || false;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setHeaderConfigAxios(token);
    }
    document.body.classList?.remove("loading");
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="">
          <Toaster
            position="top-center"
            reverseOrder={false}
            containerStyle={{}}
            toastOptions={{
              duration: 3000,
              style: {
                fontSize: 16,
              },
              error: {
                duration: 7000,
              },
            }}
          />
          <Layout pageProps={pageProps}>
            <AuthProvider>
              {requireAuth ? (
                <AuthGuard>
                  <Component {...pageProps} />
                </AuthGuard>
              ) : (
                <Component {...pageProps} />
              )}
            </AuthProvider>
            <Modal />
          </Layout>
          {/* <ToastContainer /> */}
        </div>
      </PersistGate>
      <style jsx global>
        {`
          .container {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
        `}
      </style>
    </Provider>
  );
}
