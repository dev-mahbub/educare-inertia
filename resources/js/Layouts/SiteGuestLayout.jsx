import ApplicationLogo from '@/Components/ApplicationLogo';
import Footer from '@/Components/Partials/Footer/Footer';
import HeaderLogin from '@/Components/Partials/Header/HeaderLogin';
import { Link } from "@inertiajs/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Guest({ children }) {
    return (
        <>
            <HeaderLogin />
            {children}
            <Footer />
        </>
    );
}
