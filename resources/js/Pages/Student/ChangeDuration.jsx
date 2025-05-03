import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ChangeDurationListInnerLayout from './Partials/ChangeDuration/ChangeDurationListInnerLayout';

export default function ChangeDuration({
    auth,
    siteData,
    students,
    classrooms,
    searchValue,
    classroom_id,
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Change course duration</h2>}
        >
            <Head title="Change course duration" />

            <ChangeDurationListInnerLayout
                students={students}
                classrooms={classrooms}
                searchValue={searchValue}
                classroom_id={classroom_id}
            />
        </DashboardLayout>
    );
}
