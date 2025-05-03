import SiteGuestLayout from '@/Layouts/SiteGuestLayout';
import { Head } from '@inertiajs/react';
import StudentParentsSupportInnerLayout from './Partials/StudentParentsSupport/StudentParentsSupportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function StudentParentsSupportPage({auth, siteData}) {
    return (
        <SiteGuestLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student Parents Support Page</h2>}
        >
            <Head title="Student Parents Support Page" />

            <StudentParentsSupportInnerLayout siteData={siteData} />
        </SiteGuestLayout>
    );
}