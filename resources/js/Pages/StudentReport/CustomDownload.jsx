import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CustomIdCardInnerLayout from './Partials/CustomIdDownload/CustomIdCardInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function CustomDownload({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    classrooms,
    classNames,
    academicYears,
    statusArray,
    attributes
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Custom Download</h2>}
        >
            <Head title="Custom Download" />

            <CustomIdCardInnerLayout
                classrooms={classrooms}
                classNames={classNames}
                academicYears={academicYears}
                statusArray={statusArray}
                attributes={attributes}
            />
        </DashboardLayout>
    );
}
