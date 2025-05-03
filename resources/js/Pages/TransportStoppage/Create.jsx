import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateStoppageInnerLayout from './Partials/Create/CreateStoppageInnerLayout';

export default function Create({ auth, siteData, areas, routes }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Stoppage</h2>}
        >
            <Head title="Create Stoppage" />
            
            <CreateStoppageInnerLayout
                areas={areas}
                routes={routes}
             />
        </DashboardLayout>
    );
}
