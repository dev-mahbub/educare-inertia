import SiteGuestLayout from '@/Layouts/SiteGuestLayout';
import { Head } from '@inertiajs/react';
import PageInnerLayout from './Partials/Page/PageInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function About({content}) {
    return (
        <SiteGuestLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">About Us</h2>}
        >
            <Head title="About Us" />
            <PageInnerLayout content={content} />
        </SiteGuestLayout>
    );
}