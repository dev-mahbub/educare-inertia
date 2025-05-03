import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import SetExamRoasterInnerLayout from "./Partials/SetExamRoaster/SetExamRoasterInnerLayout";

export default function Roasters({
    auth,
    siteData,
    classNames,
    exams,
    classroomExamRoasterData,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Set Exam Roaster
                </h2>
            }
        >
            <Head title="Set Exam Roaster" />

            <SetExamRoasterInnerLayout
                classNames={classNames}
                exams={exams}
                classroomExamRoasterData={classroomExamRoasterData}
            />
        </DashboardLayout>
    );
}
