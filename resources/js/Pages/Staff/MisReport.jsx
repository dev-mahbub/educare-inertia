import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StaffMisReportInnerLayout from './Partials/MisReport/StaffMisReportInnerLayout';

export default function MisReport({ auth, siteData, staffs, misCounts, departmentsStaffs, religionStaffs, 
    castleStaffs, jobTypeStaffs, designationStaffs}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fee Main</h2>}
        >
            <Head title="Fee Main" />
            
           <StaffMisReportInnerLayout 
                staffs={staffs} 
                misCounts={misCounts} 
                departmentsStaffs={departmentsStaffs} 
                religionStaffs={religionStaffs}
                castleStaffs={castleStaffs} 
                jobTypeStaffs={jobTypeStaffs} 
                designationStaffs={designationStaffs} />
        </DashboardLayout>
    );
}