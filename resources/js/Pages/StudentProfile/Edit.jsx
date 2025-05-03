import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditStudentDetailsInnerLayout from './Partials/Edit/EditStudentDetailsInnerLayout';

export default function Edit({
    auth,
    siteData,
    student,
    fatherData,
    motherData,
    guardianData,
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
    states,
    fatherUserData,
    stuSibling,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student Edit</h2>}
        >
            <Head title="Student Edit" />

            <EditStudentDetailsInnerLayout
                student={student}
                fatherData={fatherData}
                motherData={motherData}
                guardianData={guardianData}
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
                states={states}
                fatherUserData={fatherUserData}
                stuSibling={stuSibling}
            />
        </DashboardLayout>
    );
}
