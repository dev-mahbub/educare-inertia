import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StaffListInnerLayout from './Partials/List/StaffListInnerLayout';

export default function Edit({ auth, siteData, staffs, designations, houses, jobTypes, departments, teachingTypes, userRolls, staffActive=true }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Staff List</h2>}
        >
            <Head title="Staff List" />

            <StaffListInnerLayout staffs={staffs} designations={designations} houses={houses} jobTypes={jobTypes} departments={departments} teachingTypes={teachingTypes} userRolls={userRolls} staffActive={staffActive} />
        </DashboardLayout>
    );
}
