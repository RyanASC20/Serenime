import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Sidebar from '../components/Sidebar/Sidebar';
import { UserProvider } from "../hooks/useUser";
import { DateProvider } from "../hooks/useDate";

function MyApp({ Component, pageProps }) {
    return (
        <DateProvider>
            <UserProvider>
                <div className="flex">
                    <Sidebar />
                    <Component {...pageProps} />
                </div>
            </UserProvider>
        </DateProvider>
    );
}

export default MyApp;
