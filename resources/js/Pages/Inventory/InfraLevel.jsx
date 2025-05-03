import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import InfraLevelInnerLayout from './Partials/StockMaster/InfraLevel/InfraLevelInnerLayout';

export default function InfraLevel({ auth, siteData, infraLevels, childLevels, infraLavelIds, infraLavelIdString, currentLavelId, is_open }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <InfraLevelInnerLayout
                infraLevels={infraLevels}
                childLevels={childLevels}
                infraLavelIds={infraLavelIds}
                infraLavelIdString={infraLavelIdString}
                currentLavelId={currentLavelId}
                is_open={is_open}
            />
        </DashboardLayout>
    );
}