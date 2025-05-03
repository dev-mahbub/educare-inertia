import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ImportPrevousDueInnerLayout from './Partials/ImportPreviousDue/ImportPrevousDueInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function PreviousDue({ auth, siteData, mustVerifyEmail, status, schools, fees, feeTypes }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fee Previous Due</h2>}
        >
            <Head title="Fee Previous Due" />

            <ImportPrevousDueInnerLayout
                fees={fees}
                feeTypes={feeTypes}
            />
        </DashboardLayout>
    );
}
