import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ChangeStatusInnerLayout from './Partials/ChangeStatus/ChangeStatusInnerLayout';

export default function ChangeStatus({ auth, siteData, classrooms = '', students = '', classroom_id='' }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Change status</h2>
            }
        >
            <Head title="Change status" />
            <ChangeStatusInnerLayout
                classrooms={classrooms}
                students={students}
                classroom_id={classroom_id}
            />
        </DashboardLayout>
    );
}
