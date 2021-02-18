import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { UserProvider } from "../hooks/useUser";
import { DateProvider } from "../hooks/useDate";

function MyApp({ Component, pageProps }) {
    return (
        <DateProvider>
            <UserProvider>
                <Component {...pageProps} />
            </UserProvider>
        </DateProvider>
    );
}

export default MyApp;
