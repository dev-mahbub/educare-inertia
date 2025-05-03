import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import HeadWiseDailyCollectionInnerLayout from './Partials/HeadWiseDailyCollection/HeadWiseDailyCollectionInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function HeadWiseDailyCollection({ auth, siteData, mustVerifyEmail, status, schools, classNames, paymentModes, feeTypes, studentFeeReports, payment_fee_types }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fee Head Wise Daily Collection</h2>}
        >
            <Head title="Fee Head Wise Daily Collection<" />

            <HeadWiseDailyCollectionInnerLayout
                classNames={classNames}
                paymentModes={paymentModes}
                feeTypes={feeTypes}
                studentFeeReports={studentFeeReports}
                payment_fee_types={payment_fee_types}
            />
        </DashboardLayout>
    );
}
