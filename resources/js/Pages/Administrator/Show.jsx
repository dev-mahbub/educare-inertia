import { Head } from "@inertiajs/react";
import CategoryList from "./Partials/CategoryList";
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function Edit({ auth, siteData }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Administrator
                </h2>
            }
        >
            <Head title="Category List" />

            <CategoryList siteData={siteData} />
        </DashboardLayout>
    );
}
