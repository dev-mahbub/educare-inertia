import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import TakeSurveyPreviewLayout from "./Partials/TakeSurveyPreview/TakeSurveyPreviewLayout";

export default function TakeSurveyPreview({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    survey,
}) {
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
            <Head title="Take suervey" />
            <TakeSurveyPreviewLayout 
            survey={survey} />
        </DashboardLayout>
    );
}
