import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, usePage } from '@inertiajs/react';
import BiometricInnerLayout from './Partials/BuyBiometric/BiometricInnerLayout';

export default function BuyBiometric({ auth, siteData, mustVerifyEmail, holiday_types, holidays, status }) {

    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Holidays</h2>}
        >
            <Head title="Holidays" />

            <BiometricInnerLayout />
        </DashboardLayout>
    );
}