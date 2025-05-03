// import DashboardLayout from '@/Layouts/DashboardLayout';
import StudentGuestLayout from "@/Layouts/StudentGuestLayout";
import { Head } from '@inertiajs/react';
import OnlinePaymentInnerLayout from './Partials/OnlinePayment/OnlinePaymentInnerLayout';

export default function OnlinePayment({
    auth,
    siteData,
    school,
    metaData
}) {
    return (
        // <DashboardLayout
        //     user={auth.user}
        //     siteData={siteData}
        //     header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Online Payment</h2>}
        // >
        //     <Head title="Online Payment" />
            // <OnlinePaymentInnerLayout
            //     school={school}
            //     siteData={siteData}
            // />
        // </DashboardLayout>

        <StudentGuestLayout>
            {/* <Head
                title='Online Payment'
            /> */}
            <Head
                title={metaData?.title ?? 'Online Payment'}
            >
                <meta name="title" content={metaData?.title} />
                <meta name="description" content={metaData?.description} />
                <meta name="keywords" content={metaData?.keywords} />
            </Head>

            <OnlinePaymentInnerLayout
                school={school}
                siteData={siteData}
            />
        </StudentGuestLayout>
    );
}
