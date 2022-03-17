import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import Script from "next/script";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
// fetcher : 데이터를 반환해줌.
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher }}>
      <div className="mx-auto w-full max-w-xl">
        <Component {...pageProps} />
      </div>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        onLoad={() => {
          //@ts-ignore
          window.fbAsyncInit = function () {
            //@ts-ignore
            FB.init({
              appId: "your-app-id",
              autoLogAppEvents: true,
              xfbml: true,
              version: "v13.0",
            });
          };
        }}
      ></Script>
    </SWRConfig>
  );
}

export default MyApp;
