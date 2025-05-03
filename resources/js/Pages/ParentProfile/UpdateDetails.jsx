import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import UpdateDetailsInnerLayout from './Partials/UpdateDetails/UpdateDetailsInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function UpdateDetails({
    auth,
    siteData,
    students,
    genders,
    houses,
    categories,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student upgrade</h2>}
        >
            <Head title="Student upgrade" />

            <UpdateDetailsInnerLayout
                students={students}
                genders={genders}
                houses={houses}
                categories={categories}
            />
        </DashboardLayout>
    );
}
