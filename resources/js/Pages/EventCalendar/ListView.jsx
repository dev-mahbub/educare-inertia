import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ListViewInnerLayout from './Partials/ListView/ListViewInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function ListView({
    auth,
    siteData,
    exams,
    events,
    holidays
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">List View</h2>}
        >
            <Head title="List View" />

            <ListViewInnerLayout
                exams={exams}
                events={events}
                holidays={holidays}
                siteData={siteData}
            />
        </DashboardLayout>
    );
}
