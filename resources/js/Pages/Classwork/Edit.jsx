import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditClassworkInnerLayout from './Partials/Edit/EditClassworkInnerLayout';

export default function Edit({ auth, siteData, mustVerifyEmail, classWork, subjects, classNames, classRoom, states, status }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Classwork</h2>}
        >
            <Head title="Edit Classwork" />

            <EditClassworkInnerLayout
                classWork={classWork}
                subjects={subjects}
                classNames={classNames}
                classRoom={classRoom}
            />
        </DashboardLayout>
    );
}
