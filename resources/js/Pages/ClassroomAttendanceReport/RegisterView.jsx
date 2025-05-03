import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import RegisterViewInnerLayout from './Pertials/RegisterView/RegisterViewInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function RegisterView({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    classrooms
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Register View</h2>}
        >
            <Head title="Register View" />

            <RegisterViewInnerLayout
                classrooms={classrooms}
            />
        </DashboardLayout>
    );
}
