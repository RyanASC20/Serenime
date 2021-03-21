import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { UserProvider } from "../hooks/useUser";
import { DateProvider } from "../hooks/useDate";
import { SidebarProvider } from "../hooks/useSidebar";

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
