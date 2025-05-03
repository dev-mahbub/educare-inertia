import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ViewAdmissionInnerLayout from './Partials/Admission/ViewAdmissionInnerLayout';

export default function ViewAdmissionForm({
    auth,
    siteData,
    admissionData,
    states,
    houses,
    genderArr,
    admissionType
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">New Registration</h2>}
        >
            <Head title="New Registration" />

            <ViewAdmissionInnerLayout
                houses={houses}
                genderArr={genderArr}
                states={states}
                admissionType={admissionType}
                admissionData={admissionData}
            />

        </DashboardLayout>
    );
}
