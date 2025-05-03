import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AbsentReportInnerLayout from './Pertials/AbsentReport/AbsentReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function AbsentReport({
    auth,
    siteData,
    absentStudents,
    classNames,
    classrooms,
    boardingTypeArr,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">AbsentReport</h2>}
        >
            <Head title="Absent Report" />

            <AbsentReportInnerLayout
                absentStudents={absentStudents}
                classNames={classNames}
                classrooms={classrooms}
                boardingTypeArr={boardingTypeArr}
            />
        </DashboardLayout>
    );
}
