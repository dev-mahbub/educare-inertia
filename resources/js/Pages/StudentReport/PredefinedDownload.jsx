import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import PreDefinedDownloadInnerLayout from './Partials/PreDefinedDownload/PreDefinedDownloadInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function PredefinedDownload({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    classNames,
    classrooms,
    statusArray
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Predefined Download</h2>}
        >
            <Head title="Predefined Download" />

            <PreDefinedDownloadInnerLayout
                classNames={classNames}
                classrooms={classrooms}
                statusArray={statusArray}
            />
        </DashboardLayout>
    );
}
