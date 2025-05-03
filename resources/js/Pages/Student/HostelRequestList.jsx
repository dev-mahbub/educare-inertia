import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import HostelRequestInnerLayout from './Partials/HostelRequest/HostelRequestInnerLayout';

export default function HostelRequestList({ auth, siteData, students, studentId, hostelRequests}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">HostelRequest List</h2>}
        >
            <Head title="Student Hostel Request List" />

            <HostelRequestInnerLayout
                students={students}
                studentId={studentId}
                hostelRequests={hostelRequests}
            />
        </DashboardLayout>
    );
}
