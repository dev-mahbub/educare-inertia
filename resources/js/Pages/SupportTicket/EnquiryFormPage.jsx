import SiteGuestLayout from '@/Layouts/SiteGuestLayout';
import { Head, usePage } from '@inertiajs/react';
import EnquiryFormInnerLayout from './Partials/EnquiryForm/EnquiryFormInnerLayout';

export default function EnquiryFormPage({auth, siteData, activeVisitorTypes}) {
    
    return (
        <SiteGuestLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Enquiry Form Page</h2>}
        >
            <Head title="Enquiry Form Page" />
            
            <EnquiryFormInnerLayout activeVisitorTypes = {activeVisitorTypes} />
        </SiteGuestLayout>
    );
}