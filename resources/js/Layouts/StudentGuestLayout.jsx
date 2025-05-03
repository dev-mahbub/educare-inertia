import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLink from "@/Components/NavLink";
import Footer from "@/Components/Partials/Footer/Footer";
import { Link } from "@inertiajs/react";
import 'react-toastify/dist/ReactToastify.css';

export default function StudentGuestLayout({ children, }) {

    return (
        <>
            <div className="educare-dashboard-area">
                <main>{children}</main>
            </div>
            <footer className="dashboard-footer">
                <Footer />
            </footer>

        </>
    );
}
