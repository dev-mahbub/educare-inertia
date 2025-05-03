import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StudentDetailsInnerLayout from './Partials/Details/StudentDetailsInnerLayout';

export default function Details({
    auth,
    siteData,
    mustVerifyEmail,
    timezones,
    student,
    fatherData,
    motherData,
    guardianData,
    countries,
    catEmps,
    subCasteArr,
    accountArr,
    states,
    transportData,
    subjectsData
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student Details</h2>}
        >
            <Head title="Student Details" />

            <StudentDetailsInnerLayout className=""
                student={student}
                fatherData={fatherData}
                motherData={motherData}
                guardianData={guardianData}
                countries={countries}
                catEmps={catEmps}
                subCasteArr={subCasteArr}
                accountArr={accountArr}
                states={states}
                transportData={transportData}
                subjectsData={subjectsData}
           />
        </DashboardLayout>
    );
}
