import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import CreateJobInnerLayout from "./Partials/Create/CreateJobInnerLayout";

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

            <CreateJobInnerLayout genders={genders} statues={statues} />
        </DashboardLayout>
    );
}
