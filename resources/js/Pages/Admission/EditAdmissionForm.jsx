import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditAdmissionInnerLayout from './Partials/Admission/EditAdmissionInnerLayout';

export default function EditAdmissionForm({
    auth,
    siteData,
    classNames,
    houses,
    status,
    admissionNumbers,
    schBoaArr,
    casteArr,
    genderArr,
    categories,
    bloodGroups,
    religions,
    countries,
    catEmps,
    subCasteArr,
    accountArr,
    banks,
    admissionNo,
    states,
    academicYears,
    users,
    admissionSources,
    paymentMode,
    referenceTypeArr,
    alumniTypeArr,
    staffs,
    registrationData,
    admissionProcess,
    students,
    customFields
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">New Registration</h2>}
        >
            <Head title="New Registration" />

            <EditAdmissionInnerLayout
                classNames={classNames}
                houses={houses}
                status={status}
                admissionNumbers={admissionNumbers}
                schBoaArr={schBoaArr}
                casteArr={casteArr}
                genderArr={genderArr}
                categories={categories}
                bloodGroups={bloodGroups}
                religions={religions}
                countries={countries}
                catEmps={catEmps}
                subCasteArr={subCasteArr}
                accountArr={accountArr}
                banks={banks}
                admissionNo={admissionNo}
                states={states}
                academicYears={academicYears}
                users={users}
                admissionSources={admissionSources}
                paymentMode={paymentMode}
                referenceTypeArr={referenceTypeArr}
                alumniTypeArr={alumniTypeArr}
                staffs={staffs}
                registrationData={registrationData}
                admissionProcess={admissionProcess}
                students={students}
                customFields={customFields}
            />

        </DashboardLayout>
    );
}
