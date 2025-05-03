import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import RoomsTypeInnerLayout from './Partials/RoomsType/RoomsTypeInnerLayout';

export default function Show({ auth, siteData, hostelRoomType }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Show</h2>}
        >
            <Head title="Show" />

            <RoomsTypeInnerLayout
                hostelRoomType={hostelRoomType}
            />
        </DashboardLayout>
    );
}
