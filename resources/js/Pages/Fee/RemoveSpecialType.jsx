import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import RemoveSpeacialFeeTypeInnerLayout from './Partials/Master/RemoveSpeacialFeeType/RemoveSpeacialFeeTypeInnerLayout';

export default function RemoveSpecialType({ auth, siteData, mustVerifyEmail, status, specialFeeTypes, classrooms, specialFeeAssignedStudents }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Remove Special Fee Type</h2>}
        >
            <Head title="Remove Special Fee Type" />

            <RemoveSpeacialFeeTypeInnerLayout specialFeeTypes={specialFeeTypes} classrooms={classrooms} specialFeeAssignedStudents={specialFeeAssignedStudents}/>
        </DashboardLayout>
    );
}
