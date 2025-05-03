import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import TransportMisReportInnerLayout from './Partials/MisReport/TransportMisReportInnerLayout';

export default function MisReport({ auth, siteData, transports, misCounts, classroomTransports, areaTransports }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fee Main</h2>} >
            <Head title="Fee Main" />
            
           <TransportMisReportInnerLayout 
                transports={transports}
                misCounts={misCounts}
                classroomTransports={classroomTransports} 
                areaTransports={areaTransports} />
        </DashboardLayout>
    );
}