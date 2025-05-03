import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import SetSectionWorkingInnerLayout from "./Partials/SetSectionWorking/SetSectionWorkingInnerLayout";
const match = "";
const updateIcon = "";
const deleteIcon = "";

export default function SetSectionWorking({
    auth,
    siteData,
    workingClassroom,
    academicSession,
    monthArr,
    academicYearId,
    monthId,
    classId,
    classNames,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Set Section Working
                </h2>
            }
        >
            <Head title="Set Section Working" />

            <SetSectionWorkingInnerLayout
                workingClassroom={workingClassroom}
                academicSession={academicSession}
                monthArr={monthArr}
                academicYearId={academicYearId}
                monthId={monthId}
                classId={classId}
                classNames={classNames}
            />
        </DashboardLayout>
    );
}
