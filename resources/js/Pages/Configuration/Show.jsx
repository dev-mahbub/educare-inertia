import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ConfigurationInnerLayout from './Partials/ConfigurationInnerLayout';

export default function Edit({ auth, siteData }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Configurations</h2>}
        >
            <Head title="Configurations" />

            <ConfigurationInnerLayout siteData={siteData} />
        </DashboardLayout>
    );
}
