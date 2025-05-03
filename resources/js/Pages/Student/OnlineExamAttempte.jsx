import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import OnlineExamAttempteInnerLayout from "./Partials/OnlineExamAttempte/OnlineExamAttempteInnerLayout";

export default function OnlineExamAttempte({
    auth,
    siteData,
    mustVerifyEmail,
    students,
    virtualExam,
    studentId
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Online Exam Attempte
                </h2>
            }
        >
            <Head title="Online Exam Attempte" />
            <OnlineExamAttempteInnerLayout virtualExam={virtualExam} students={students} studentId={studentId} />
        </DashboardLayout>
    );
}
