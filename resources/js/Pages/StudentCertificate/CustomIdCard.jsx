import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CustomIdCardInnerLayout from './Partials/CustomIdCard/CustomIdCardInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function CustomIdCard({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    classrooms,
    audienceTypeArray,
    orientationTypeArray,
    idCardCertificates,
    idCardCertificate,
    fields,
    students,
    fontSizeArray,
    staffs
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Custom Id Card</h2>}
        >
            <Head title="Custom Id Card" />

            <CustomIdCardInnerLayout
                classrooms={classrooms}
                audienceTypeArray={audienceTypeArray}
                orientationTypeArray={orientationTypeArray}
                idCardCertificates={idCardCertificates}
                idCardCertificate={idCardCertificate}
                fields={fields}
                students={students}
                fontSizeArray={fontSizeArray}
                staffs={staffs}
            />
        </DashboardLayout>
    );
}
