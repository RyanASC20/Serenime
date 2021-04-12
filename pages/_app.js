import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { UserProvider } from "../context/useUser";
import { DateProvider } from "../context/useDate";
import { SidebarProvider } from "../context/useSidebar";

function MyApp({ Component, pageProps }) {
    return (
        <DateProvider>
            <UserProvider>
                <SidebarProvider>
                    <Component {...pageProps} />
                </SidebarProvider>
            </UserProvider>
        </DateProvider>
    );
}

export default MyApp;
