import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import FeeCategoryInnerLayout from './Partials/Master/FeeCategory/FeeCategoryInnerLayout';
import FeePaymentInnerLayout from './Partials/Payment/FeePaymentInnerLayout';

export default function Edit({ auth, siteData, mustVerifyEmail, timezones, countries, states, status }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Fee</h2>}
        >
            <Head title="Edit Fee" />
            
            {/* <FeeCategoryInnerLayout /> */}
            <FeePaymentInnerLayout />
        </DashboardLayout>
    );
}
