import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import HostelCreateRequestInnerLayout from './Partials/HostelRequest/HostelCreateRequestInnerLayout';

export default function HostelRequestCreate({ auth, siteData, students, studentId, hostelTypes}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">HostelRequest Create</h2>}
        >
            <Head title="Student Hostel Request Create" />

            <HostelCreateRequestInnerLayout
                students={students}
                studentId={studentId}
                hostelTypes={hostelTypes}
            />
        </DashboardLayout>
    );
}
