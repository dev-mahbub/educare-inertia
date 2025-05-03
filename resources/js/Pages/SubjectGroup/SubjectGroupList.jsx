import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import SubjectGroupListInnerLayout from "./Partials/List/SubjectGroupListInnerLayout";

export default function SubjectGroupList({
    auth,
    siteData,
    infraLevels,
    childLevels,
    infraLavelIds,
    infraLavelIdString,
    currentLavelId,
    is_open,
    type,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Subject Group
                </h2>
            }
        >
            <Head title="Setup Hostel" />

            <SubjectGroupListInnerLayout
                infraLevels={infraLevels}
                childLevels={childLevels}
                infraLavelIds={infraLavelIds}
                infraLavelIdString={infraLavelIdString}
                currentLavelId={currentLavelId}
                is_open={is_open}
                type={type}
            />
        </DashboardLayout>
    );
}
