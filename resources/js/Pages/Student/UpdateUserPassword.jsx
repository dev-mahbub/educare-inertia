import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import UpdateUserPasswordInnerLayout from './Partials/UpdateUserPassword/UpdateUserPasswordInnerLayout';

export default function UpdateUserPassword({ auth, siteData, exitUser, credentStudents }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Update user password</h2>
            }
        >
            <Head title="Update user password" />
            <UpdateUserPasswordInnerLayout
                exitUser={exitUser}
                credentStudents={credentStudents}
            />
        </DashboardLayout>
    );
}
