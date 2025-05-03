import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditClassInnerLayout from './Partials/EditClassInnerLayout';

export default function Create({ auth, siteData, mustVerifyEmail, classrooms, subject_titles, subject_grades, classNames, status }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Edit class" />

            <EditClassInnerLayout
                classrooms={classrooms}
                subject_titles={subject_titles}
                subject_grades={subject_grades}
                classNames={classNames}
            />
        </DashboardLayout>
    );
}