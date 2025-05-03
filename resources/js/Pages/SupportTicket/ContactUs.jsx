import SiteGuestLayout from '@/Layouts/SiteGuestLayout';
import { Head } from '@inertiajs/react';
import ContactUstInnerLayout from './Partials/ContactUs/ContactUstInnerLayout';

export default function ContactUs({auth, siteData, ContactReasons, currentSchoolInfo}) {
    return (
        <SiteGuestLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Contact Us</h2>}
        >
            <Head title="Contact Us" />
            
            <ContactUstInnerLayout ContactReasons={ContactReasons} auth={auth} siteData={siteData} currentSchoolInfo={currentSchoolInfo}/>
        </SiteGuestLayout>
    );
}