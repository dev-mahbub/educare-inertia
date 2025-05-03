import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import BuyServiceInnerLayout from './Partials/BuyService/BuyServiceInnerLayout';

export default function BuyService({
    auth,
    siteData,
    services,
    gstValue
}) {

    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Holidays</h2>}
        >
            <Head title="Holidays" />

            <BuyServiceInnerLayout
                services={services}
                gstValue={gstValue}
            />
        </DashboardLayout>
    );
}
