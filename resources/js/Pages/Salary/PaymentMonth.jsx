import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import PaymentMonthInnerLayout from './Partials/PaymentMonth/PaymentMonthInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function PaymentMonth({
    auth,
    siteData,
    paymentMonths
}) {
  return (
    <DashboardLayout
      user={auth.user}
      siteData={siteData}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Payment Month</h2>}
    >
        <Head title="Payment Month" />

        <PaymentMonthInnerLayout
            paymentMonths={paymentMonths}
        />
    </DashboardLayout>
  );
}
