import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EnquiryTypeInnerLayout from './Partials/EnquiryType/EnquiryTypeInnerLayout';


export default function EnquiryType({ auth, siteData, mustVerifyEmail, visitorsTypes, singleVisitorType, schools }) {
  
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Enquiry Type</h2>}
        >
            <Head title="Enquiry Type" />

            <EnquiryTypeInnerLayout visitorsTypes={visitorsTypes} singleVisitorType={singleVisitorType} />
        </DashboardLayout>
    );
}