import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import SetClassWorkingInnerLayout from './Partials/SetClassWorking/SetClassWorkingInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function SetClassWorking({
    auth,
    siteData,
    classNames,
    academicSession,
    monthArr,
    academicYearId,
    monthId,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Set Class Working</h2>}
        >
            <Head title="Set Class Working" />

            <SetClassWorkingInnerLayout
                classNames={classNames}
                academicSession={academicSession}
                monthArr={monthArr}
                academicYearId={academicYearId}
                monthId={monthId}
            />
        </DashboardLayout>
    );
}
