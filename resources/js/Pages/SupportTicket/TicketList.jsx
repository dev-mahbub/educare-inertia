import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import TicketListInnerLayout from './Partials/TicketList/TicketListInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function TicketList({ auth, siteData, mustVerifyEmail, status, schools, supportTickets, contactReasons, teachers, students, classrooms }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Request List of Ticket</h2>}
        >
            <Head title="Request List of Ticket" />

            <TicketListInnerLayout supportTickets={supportTickets} contactReasons={contactReasons} teachers={teachers} status={status} />
        </DashboardLayout>
    );
}