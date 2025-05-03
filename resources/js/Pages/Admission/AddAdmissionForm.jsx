import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AddAdmissionInnerLayout from './Partials/Admission/AddAdmissionInnerLayout';

export default function AddAdmissionForm({
    auth,
    siteData,
    registrationData,
    states,
    houses,
    categories,
    bloodGroups,
    religions,
    genderArr,
    admissionType,
    admissionProcess,
    classrooms,
    isFeeStructureWithTemplate,
    feeStructures,
    feeStructure
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">New Registration</h2>}
        >
            <Head title="New Registration" />

            <AddAdmissionInnerLayout
                houses={houses}
                genderArr={genderArr}
                categories={categories}
                bloodGroups={bloodGroups}
                religions={religions}
                states={states}
                admissionType={admissionType}
                registrationData={registrationData}
                admissionProcess={admissionProcess}
                classrooms={classrooms}
                isFeeStructureWithTemplate={isFeeStructureWithTemplate}
                feeStructures={feeStructures}
                feeStructure={feeStructure}
            />

        </DashboardLayout>
    );
}
