import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import SummaryInnerLayout from './Partials/ClassSummary/SummaryInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Search({
    auth,
    siteData,
    classNames,
    classrooms,
    students,
    maleStudents,
    femaleStudents,
    otherStudents,
    newStudents,
    promotedStudents,
    classTotalStudent,
    classroomTotalStudent
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Class Summary List</h2>}
        >
            <Head title="Class Summary List" />

            <SummaryInnerLayout
                classNames={classNames}
                classrooms={classrooms}
                students={students}
                maleStudents={maleStudents}
                femaleStudents={femaleStudents}
                otherStudents={otherStudents}
                newStudents={newStudents}
                promotedStudents={promotedStudents}
                classTotalStudent={classTotalStudent}
                classroomTotalStudent={classroomTotalStudent}
            />
        </DashboardLayout>
    );
}
