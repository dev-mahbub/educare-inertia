import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateClassworkInnerLayout from './Partials/Create/CreateClassworkInnerLayout';

export default function Create({ auth, siteData, mustVerifyEmail, subjects, classNames, classRoom, states, status }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Classwork</h2>}
        >
            <Head title="Create Classwork" />

            <CreateClassworkInnerLayout
                subjects={subjects}
                classNames={classNames}
                classRoom={classRoom}
            />
        </DashboardLayout>
    );
}
