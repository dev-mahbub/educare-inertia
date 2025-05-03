import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import HomeworkInnerLayout from './Partials/List/HomeworkInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Edit({ auth, siteData, homeWorks }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Homework List</h2>}
        >
            <Head title="Homework List" />

            <HomeworkInnerLayout homeWorks={homeWorks} />
        </DashboardLayout>
    );
}
