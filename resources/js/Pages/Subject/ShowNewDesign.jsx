import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import AssignClassSubjectInnerLayout from "./Partials/AcademicActions/Assign/AssignClassSubjectInnerLayout";

export default function Show({
    auth,
    siteData,
    subjects,
    classSubjectTypes,
    grades,
    classSubjects,
    classnames,
    subjectGroup,
    classNameId,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Subjects
                </h2>
            }
        >
            <Head title="Subjects" />
            <AssignClassSubjectInnerLayout
                subjects={subjects}
                classSubjectTypes={classSubjectTypes}
                grades={grades}
                classSubjects={classSubjects}
                classnames={classnames}
                subjectGroup={subjectGroup}
                classNameId={classNameId}
            />
        </DashboardLayout>
    );
}
