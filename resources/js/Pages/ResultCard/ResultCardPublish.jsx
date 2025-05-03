import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import PublishReportCardParentInnerLayout from './Partials/PublishReportCardParent/PublishReportCardParentInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function ResultCardPublish({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Publish Report Card for Parent</h2>}
        >
            <Head title="Publish Report Card for Parent" />

            <PublishReportCardParentInnerLayout />
        </DashboardLayout>
    );
}
