import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AllcationInnerLayout from './Partials/Allocation/AllcationInnerLayout';

export default function Allocation({
    auth,
    siteData,
    classrooms,
    vouchers,
    routes,
    transportTypeArr,
    stoppages,
    teachers,
    availableSeats,
    studentDetailsData,
    teacherDetailsData,
    prevStudentDetailsData,
    prevTeacherDetailsData,
    transportFeeStructureSetting,
    allStudentData,
    student,
    staff
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Transport Allocation</h2>}
        >
            <Head title="Transport Allocation" />

            <AllcationInnerLayout
                classrooms={classrooms}
                vouchers={vouchers}
                routes={routes}
                transportTypeArr={transportTypeArr}
                stoppages={stoppages}
                teachers={teachers}
                availableSeats={availableSeats}
                studentDetailsData={studentDetailsData}
                teacherDetailsData={teacherDetailsData}
                prevStudentDetailsData={prevStudentDetailsData}
                prevTeacherDetailsData={prevTeacherDetailsData}
                transportFeeStructureSetting={transportFeeStructureSetting}
                allStudentData={allStudentData}
                student={student}
                staff={staff}
            />
        </DashboardLayout>
    );
}
