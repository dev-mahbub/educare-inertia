import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AllocateBookToLocationInnerLayout from './Partials/AllocateBookToLocation/AllocateBookToLocationInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function AllocateBookToLocation({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Allocate Book To Location</h2>}
        >
            <Head title="Allocate Book To Location" />

            <AllocateBookToLocationInnerLayout/>
        </DashboardLayout>
    );
}