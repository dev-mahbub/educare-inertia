import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditTicketInnerLayout from './Partials/EditTicket/EditTicketInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function EditTicket({ auth, siteData, supportTicket, teachers, status, requestTypeTickets }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Ticket</h2>}
        >
            <Head title="Edit Ticket" />

            <EditTicketInnerLayout supportTicket={supportTicket} teachers={teachers} status={status} requestTypeTickets={requestTypeTickets} />
        </DashboardLayout>
    );
}