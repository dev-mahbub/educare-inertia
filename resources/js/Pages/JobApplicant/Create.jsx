import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import AddCandidateInnerLayout from "./Partials/AddCandidate/AddCandidateInnerLayout";

export default function Create({ auth, siteData, genders, statues }) {
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
            <Head title="Create job" />

            <AddCandidateInnerLayout/>
        </DashboardLayout>
    );
}
