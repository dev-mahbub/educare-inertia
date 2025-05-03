import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import AcademicSyllabusInnerLayout from "./Partials/Syllabus/AcademicSyllabusInnerLayout";

export default function AcademicSyllabus({
    auth,
    siteData,
    classNames,
    subjects,
    academicSyllabuses,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Academic Syllabus
                </h2>
            }
        >
            <Head title="Academic Syllabus" />

            <AcademicSyllabusInnerLayout
                classNames={classNames}
                subjects={subjects}
                academicSyllabuses={academicSyllabuses}
            />
        </DashboardLayout>
    );
}
