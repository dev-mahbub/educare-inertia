import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateTicketInnerLayout from './Partials/CreateTicket/CreateTicketInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function CreateTicket({ auth, siteData, mustVerifyEmail, status, schools, contactReasons, classrooms, students, teachers }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Ticket</h2>}
        >
            <Head title="Create Ticket" />

            <CreateTicketInnerLayout contactReasons={contactReasons} classrooms={classrooms} students={students} teachers={teachers} />
        </DashboardLayout>
    );
}