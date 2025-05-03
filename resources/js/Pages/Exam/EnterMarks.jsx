import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import SubjectWiseInnerLayout from "./Partials/ExamMarks/SubjectWise/SubjectWiseInnerLayout";

export default function EnterMarks({
    auth,
    siteData,
    classrooms,
    subjects,
    exams,
    classWiseData,
    apsenceReson,
    fullMinMark,
    grade,
    is_co_scholastic,
    isMarkFreezed
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Subject Wise Marks
                </h2>
            }
        >
            <Head title="Subject Wise Marks" />

            <SubjectWiseInnerLayout
                classrooms={classrooms}
                subjects={subjects}
                exams={exams}
                classWiseData={classWiseData}
                apsenceReson={apsenceReson}
                fullMinMark={fullMinMark}
                grade={grade}
                is_co_scholastic={is_co_scholastic}
                isMarkFreezed={isMarkFreezed}
            />
        </DashboardLayout>
    );
}