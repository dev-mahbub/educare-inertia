import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import InActiveListInnerLayout from './Partials/InActive/List/InActiveListInnerLayout';

export default function Edit({ auth, siteData, inactiveStaffs, designations = '', houses = '', jobTypes = '', departments = '', teachingTypes = '', userRolls = '', staffActive=false }) {
    return ( 
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Inactive Staff List</h2>}
        >
            <Head title="Inactive Staff List" />

            <InActiveListInnerLayout inactiveStaffs={inactiveStaffs} designations={designations} houses={houses} jobTypes={jobTypes} departments={departments} teachingTypes={teachingTypes} userRolls={userRolls} staffActive={staffActive} />
        </DashboardLayout>
    );
}
