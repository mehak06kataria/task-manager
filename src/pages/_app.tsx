import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";

import { api } from "../utils/api"; // relative path
import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={GeistSans.className}>
      <Component {...pageProps} />
    </div>
  );
};

export default api.withTRPC(MyApp);
