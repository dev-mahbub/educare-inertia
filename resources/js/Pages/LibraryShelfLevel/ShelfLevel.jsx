import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ShelfLevelInnerLayout from './Partials/ShelfLevel/ShelfLevelInnerLayout';

export default function ShelfLevel({ auth, siteData, librarySelfLevels }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Shelf Level</h2>}
        >
            <Head title="Shelf Level" />

            <ShelfLevelInnerLayout
                librarySelfLevels={librarySelfLevels}
            />
        </DashboardLayout>
    );
}
