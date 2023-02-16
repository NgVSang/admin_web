// import App from "next/app";
import moment from 'moment';
import 'moment/locale/vi';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { createContext, ReactElement, ReactNode, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from '@/store';
import '@/assets/css/globals.css'

moment.locale('vi');

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export const EntryContext = createContext<any>({});
export const SidebarContext = createContext<any>({});

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout ?? ((page) => page);
    const [render, setRender] = useState('')
    return (
        <Provider store={store}>
            <div>
                <Toaster position='top-center'
                    reverseOrder={false}
                    containerStyle={{
                    }}
                    toastOptions={{
                        duration: 5000,
                        style: {
                            fontSize: 16,
                        },
                        error: {
                            duration: 7000,
                        }
                    }}
                />

                {getLayout(<Component {...pageProps} />)}
            </div>
        </Provider>
    );
}
