import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AdmissionSourceInnerLayout from './Partials/Source/AdmissionSourceInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Edit({ auth, siteData, enquirySource}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admission Source</h2>}
        >
            <Head title="Admission Source" />

            <AdmissionSourceInnerLayout 
              enquirySource = {enquirySource}
            />
        </DashboardLayout>
    );
}
