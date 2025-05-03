import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ModuleInnerLayout from './Partials/ModuleInnerLayout';

export default function Edit({ auth, siteData, schools, modules, schoolId}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Modules</h2>}
        >
            <Head title="Modules" />

            <ModuleInnerLayout 
                auth={auth} 
                siteData={siteData} 
                schools={schools} 
                modules={modules} 
                schoolId={schoolId} />
        </DashboardLayout>
    );
}