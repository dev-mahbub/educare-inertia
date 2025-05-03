import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import FreezeMarksInnerLayout from "./Partials/FreezeMarks/FreezeMarksInnerLayout";
const match = "";
const updateIcon = "";
const deleteIcon = "";

export default function FreezeMarks({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    exams,
    classNames,
    freezeMarksSubjectWiese,
    classrooms,
    subjects
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
            <FreezeMarksInnerLayout 
                exams ={exams}
                classNames = {classNames}
                freezeMarksSubjectWiese = {freezeMarksSubjectWiese}
                classrooms={classrooms}
                subjects={subjects}
            />
        </DashboardLayout>
    );
}
