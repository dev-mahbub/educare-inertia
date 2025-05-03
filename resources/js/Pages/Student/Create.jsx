import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateStudentInnerLayout from './Partials/Create/CreateStudentInnerLayout';

export default function Create({
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
    feeStructures,
    isFeeStructureWithTemplate,
    customFields,
    occupations,
    optionalSubjects
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Student</h2>}
        >
            <Head title="Create Student" />

            <CreateStudentInnerLayout
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
                feeStructures={feeStructures}
                isFeeStructureWithTemplate={isFeeStructureWithTemplate}
                customFields={customFields}
                occupations={occupations}
                optionalSubjects={optionalSubjects}
            />

        </DashboardLayout>
    );
}
