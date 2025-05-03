import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import StudentClassWiseReportInnerLayout from "./Partials/StudentClassWiseReport/StudentClassWiseReportInnerLayout";
const match = "";
const updateIcon = "";
const deleteIcon = "";

export default function StudentClassWiseReport({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    classrooms,
    studentDocumentCategories,
    studentDocumentReports
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Student Class Wise Report
                </h2>
            }
        >
            <Head title="Student Class Wise Report" />

            <StudentClassWiseReportInnerLayout
                classrooms={classrooms}
                studentDocumentCategories={studentDocumentCategories}
                studentDocumentReports={studentDocumentReports}
            />
        </DashboardLayout>
    );
}
