import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import MultiIssuesBooksInnerLayout from './Partials/MultiIssuesBooks/MultiIssuesBooksInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function MultiIssuesBooks({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Multi Issues Books</h2>}
        >
            <Head title="Multi Issues Books" />

            <MultiIssuesBooksInnerLayout/>
        </DashboardLayout>
    );
}