import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import MySubscriptionInnerLayout from './Partials/Subscription/MySubscriptionInnerLayout';

export default function MySubscription({
    auth,
    siteData,
    subscriptions
}) {

    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Holidays</h2>}
        >
            <Head title="Holidays" />

            <MySubscriptionInnerLayout
                subscriptions={subscriptions}
            />
        </DashboardLayout>
    );
}
