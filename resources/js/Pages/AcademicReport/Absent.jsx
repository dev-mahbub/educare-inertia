import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import AbsentReportInnerLayout from "./Partials/AbsentReport/AbsentReportInnerLayout";

export default function Absent({
    auth,
    siteData,
    exams,
    classrooms,
    subjects,
    absentStudentData,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Absent Report
                </h2>
            }
        >
            <Head title="Absent Report" />

            <AbsentReportInnerLayout
                exams={exams}
                classrooms={classrooms}
                subjects={subjects}
                absentStudentData={absentStudentData}
            />
        </DashboardLayout>
    );
}
