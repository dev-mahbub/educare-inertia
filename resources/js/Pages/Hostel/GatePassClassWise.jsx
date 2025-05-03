import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import GatePassClassWiseInnerLayout from './Partials/GatePassClassWise/GatePassClassWiseInnerLayout';

export default function GatePassClassWise({
    auth,
    siteData,
    classroomData,
    gatePass,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Gate Pass Class Wise</h2>}
        >
            <Head title="Gate Pass Class Wise" />

            <GatePassClassWiseInnerLayout
                classroomData={classroomData}
                gatePass={gatePass}
            />
        </DashboardLayout>
    );
}
