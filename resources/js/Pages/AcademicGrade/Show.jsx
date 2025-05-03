import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import GradingInnerLayout from "./Partials/Grading/GradingInnerLayout";

export default function Show({ auth, siteData, grades, grade }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Grading
                </h2>
            }
        >
            <Head title="Grading" />
            <GradingInnerLayout grades={grades} grade={grade}/>
        </DashboardLayout>
    );
}
