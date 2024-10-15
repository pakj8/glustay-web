import { Poppins } from "next/font/google";
import "../styles/globals.css";

// Call the font loader at the module scope
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <main className={`${poppins.className}`}>
      <Component {...pageProps} />
    </main>
  );
}
