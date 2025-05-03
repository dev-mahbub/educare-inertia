import SiteGuestLayout from '@/Layouts/SiteGuestLayout';
import { Head } from '@inertiajs/react';
import PageInnerLayout from './Partials/Page/PageInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Contact({content}) {
    return (
        <SiteGuestLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{content?.title}</h2>}
        >
            <Head title="Contact" />
            <PageInnerLayout content={content} />
        </SiteGuestLayout>
    );
}