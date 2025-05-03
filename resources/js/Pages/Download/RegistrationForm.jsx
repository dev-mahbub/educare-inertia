import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import RegistrationFormInnerLayout from './Partials/RegistrationForm/RegistrationFormInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function RegistrationForm({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Registration Form</h2>}
        >
            <Head title="Registration Form" />

           <RegistrationFormInnerLayout/>
        </DashboardLayout>
    );
}
