import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import GatePassInnerLayout from "./Partials/GatePass/GatePassInnerLayout";
const match = "";
const updateIcon = "";
const deleteIcon = "";

export default function GatePass({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    visitors,
    relactionType,
    classrooms,
    students,
    studentGatePass,
    gateNextNo
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Gate Pass
                </h2>
            }
        >
            <Head title="Gate Pass" />
            <GatePassInnerLayout classrooms={classrooms} visitors={visitors}  relactionType={relactionType} students={students} studentGatePass={studentGatePass} gateNextNo={gateNextNo}/>
        </DashboardLayout>
    );
}
