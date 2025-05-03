import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StudentDetailsInnerLayout from './Partials/Details/StudentDetailsInnerLayout';

export default function Details({
    auth,
    siteData,
    mustVerifyEmail,
    timezones,
    countries,
    states,
    status,
    student,
    fatherData,
    motherData,
    guardianData,
    classNames,
    houses,
    admissionNumbers,
    schBoaArr,
    casteArr,
    genderArr,
    categories,
    bloodGroups,
    religions,
    catEmps,
    subCasteArr,
    accountArr,
    banks,
    fatherUserData,
    stuSibling
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student Details</h2>}
        >
            <Head title="Student Details" />

            <StudentDetailsInnerLayout className=""
                countries={countries}
                states={states}
                status={status}
                student={student}
                fatherData={fatherData}
                motherData={motherData}
                guardianData={guardianData}
                classNames={classNames}
                houses={houses}
                admissionNumbers={admissionNumbers}
                schBoaArr={schBoaArr}
                casteArr={casteArr}
                genderArr={genderArr}
                categories={categories}
                bloodGroups={bloodGroups}
                religions={religions}
                catEmps={catEmps}
                subCasteArr={subCasteArr}
                accountArr={accountArr}
                banks={banks}
                fatherUserData={fatherUserData}
                stuSibling={stuSibling}
            />
        </DashboardLayout>
    );
}
