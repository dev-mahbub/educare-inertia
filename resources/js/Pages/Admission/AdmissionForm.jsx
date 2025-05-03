import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateAdmissionInnerLayout from './Partials/Admission/CreateAdmissionInnerLayout';

export default function AdmissionForm({
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
    admissionProcess,
    enquiry,
    students,
    academicYearId,
    customFields
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">New Registration</h2>}
        >
            <Head title="New Registration" />

            <CreateAdmissionInnerLayout
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
                admissionProcess={admissionProcess}
                enquiry={enquiry}
                students={students}
                academicYearId={academicYearId}
                customFields={customFields}
            />

        </DashboardLayout>
    );
}
