import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import AllCandidatesInnerLayout from "./Partials/AllCandidates/AllCandidatesInnerLayout";

export default function Show({ auth, siteData, jobs }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Profile
                </h2>
            }
        >
            <Head title="Job list" />
            <AllCandidatesInnerLayout />
        </DashboardLayout>
    );
}
