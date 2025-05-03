import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateClassInnerLayout from './Partials/CreateClassInnerLayout';

export default function Create({ auth, siteData, mustVerifyEmail, classNames, subject_titles, subject_grades,  status }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Create class" />

            <CreateClassInnerLayout
                classNames={classNames}
                subject_titles={subject_titles}
                subject_grades={subject_grades}
            />
        </DashboardLayout>
    );
}