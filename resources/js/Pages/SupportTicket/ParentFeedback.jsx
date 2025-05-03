import SiteGuestLayout from '@/Layouts/SiteGuestLayout';
import { Head } from '@inertiajs/react';
import ParentFeedbackInnerLayout from './Partials/ParentFeedback/ParentFeedbackInnerLayout';

export default function ParentFeedback() {
    return (
        <SiteGuestLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Parent Feedback</h2>}
        >
            <Head title="Parent Feedback" />
            
            <ParentFeedbackInnerLayout />
        </SiteGuestLayout>
    );
}