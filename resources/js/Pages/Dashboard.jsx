import DashboardInnerLayout from '@/Components/Partials/Dashboard/DashboardInnerLayout';
import ParentDashboardInnerLayout from '@/Components/Partials/Dashboard/ParentDashboardInnerLayout';
import StudentDashboardInnerLayout from '@/Components/Partials/Dashboard/StudentDashboardInnerLayout';
import TeacherDashboardInnerLayout from '@/Components/Partials/Dashboard/TeacherDashboardInnerLayout';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({
    auth,
    siteData,
    studentCounts,
    staffCounts,
    transportCounts,
    students,
    studentId
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            { siteData?.authRoles.indexOf("Super Admin") > -1 ?
                <DashboardInnerLayout
                siteData={siteData}
                studentCounts={studentCounts}
                staffCounts={staffCounts}
                transportCounts={transportCounts}
                />
            :
                (siteData?.authRoles.indexOf("Teacher") > -1 ?
                    <TeacherDashboardInnerLayout />
                :
                    (siteData?.authRoles.indexOf("Parent") > -1 ?
                        <ParentDashboardInnerLayout
                            students={students}
                            studentId={studentId}
                        />
                    :
                        (siteData?.authRoles.indexOf("Student") > -1 ?
                            <StudentDashboardInnerLayout />
                            :
                            <DashboardInnerLayout
                                siteData={siteData}
                                studentCounts={studentCounts}
                                staffCounts={staffCounts}
                                transportCounts={transportCounts} /> /* admin or others */
                        )
                    )
                )
            }

        </DashboardLayout>
    );
}
