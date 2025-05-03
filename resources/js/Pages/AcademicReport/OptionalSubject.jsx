import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import OptionalSubjectReportInnerLayout from "./Partials/OptionalSubjectReport/OptionalSubjectReportInnerLayout";

export default function OptionalSubject({
    auth,
    siteData,
    subjects,
    classrooms,
    getStudentData,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Optional Subject Report
                </h2>
            }
        >
            <Head title="Optional Subject Report" />

            <OptionalSubjectReportInnerLayout
                subjects={subjects}
                classrooms={classrooms}
                getStudentData={getStudentData}
            />
        </DashboardLayout>
    );
}
