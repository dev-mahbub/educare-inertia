import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateJournalInnerLayout from './Partials/Journal/CreateJournalInnerLayout';

export default function Journal({
    auth,
    siteData,
    ledgers,
    modeOptions,
    nextVoucherNo
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Inventory Journal</h2>}
        >
            <Head title="Inventory Journal" />
            <CreateJournalInnerLayout
                ledgers={ledgers}
                modeOptions={modeOptions}
                nextVoucherNo={nextVoucherNo}
            />
        </DashboardLayout>
    );
}

