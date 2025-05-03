import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ClassworkInnerLayout from './Partials/List/ClassworkInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Edit({ auth, siteData, mustVerifyEmail, classWorks, classrooms, subjects }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Classwork List</h2>}
        >
            <Head title="Classwork List" />

            <ClassworkInnerLayout classWorks={classWorks} classrooms={classrooms} subjects={subjects} />
        </DashboardLayout>
    );
}
