import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateHomeworkInnerLayout from './Partials/Create/CreateHomeworkInnerLayout';

export default function Create({ auth, siteData, mustVerifyEmail, subjects, classNames, classRoom, homeworkTypes, states, status }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Homework</h2>}
        >
            <Head title="Create Homework" />

            <CreateHomeworkInnerLayout
                subjects={subjects}
                classNames={classNames}
                classRoom={classRoom}
                homeworkTypes={homeworkTypes}
            />
        </DashboardLayout>
    );
}
