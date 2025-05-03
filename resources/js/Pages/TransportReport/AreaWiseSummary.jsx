import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AreaWiseSummaryInnerLayout from './Partials/AreaWiseSummary/AreaWiseSummaryInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function AreaWiseSummary({
    auth,
    siteData,
    areaData,
    areaName,
    studentData,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Area Wise Summary</h2>}
        >
            <Head title="Area Wise Summary" />

            <AreaWiseSummaryInnerLayout
                areaData={areaData}
                areaName={areaName}
                studentData={studentData}
            />
        </DashboardLayout>
    );
}
