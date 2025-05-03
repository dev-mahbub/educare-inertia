import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import DeallocationInnerLayout from './Partials/Deallocation/DeallocationInnerLayout';

export default function Deallocation({
    auth,
    siteData,
    classrooms,
    students,
    currentAllocationData,
    prevAllocationData,
    studentId,
    classroomId,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Deallocation</h2>}
        >
            <Head title="Deallocation" />

            <DeallocationInnerLayout
                classrooms={classrooms}
                students={students}
                currentAllocationData={currentAllocationData}
                prevAllocationData={prevAllocationData}
                studentId={studentId}
                classroomId={classroomId}
            />
        </DashboardLayout>
    );
}
