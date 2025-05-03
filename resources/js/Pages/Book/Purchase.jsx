import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import PurchaseInnerLayout from './Partials/Purchase/PurchaseInnerLayout';

export default function Purchase({
    auth,
    siteData,
    bookTypes,
    paymentMode,
    libraryVendor,
    bankNames,
    bookCategory,
    classNames,
    subjects,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Purchase</h2>}
        >
            <Head title="Purchase" />

            <PurchaseInnerLayout
                bookTypes={bookTypes}
                paymentMode={paymentMode}
                libraryVendor={libraryVendor}
                bankNames={bankNames}
                bookCategory={bookCategory}
                classNames={classNames}
                subjects={subjects}
            />
        </DashboardLayout>
    );
}
