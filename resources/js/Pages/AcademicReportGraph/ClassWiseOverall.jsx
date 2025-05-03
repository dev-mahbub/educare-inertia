import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import GraphClassWiseOverallInnerLayout from './Partials/GraphClassWiseOverall/GraphClassWiseOverallInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function ClassWiseOverall({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    classrooms,
    ranges,
    classWiseOverallReport
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Graph-Class wise overall</h2>}
        >
            <Head title="Graph-Class wise overall" />

            <GraphClassWiseOverallInnerLayout
                classrooms = {classrooms}
                ranges = {ranges}
                classWiseOverallReport={classWiseOverallReport}
            />
        </DashboardLayout>
    );
}
