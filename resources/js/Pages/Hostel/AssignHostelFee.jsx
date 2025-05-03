import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AssignHostelFeeInnerLayout from './Partials/AssignHostelFee/AssignHostelFeeInnerLayout';

export default function AssignHostelFee({
    auth,
    siteData,
    classNames,
    classrooms,
    hostelFeeData,
    hostelVoucherData,
    studentData,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Assign Hostel Fee</h2>}
        >
            <Head title="Assign Hostel Fee" />

            <AssignHostelFeeInnerLayout
                classNames={classNames}
                classrooms={classrooms}
                hostelFeeData={hostelFeeData}
                hostelVoucherData={hostelVoucherData}
                studentData={studentData}
            />
        </DashboardLayout>
    );
}
