import { Head } from "@inertiajs/react";
import CategoryList from "./Partials/CategoryList";
import DashboardLayout from '@/Layouts/DashboardLayout';
const match = "";
const updateIcon = "";
const deleteIcon = "";

export default function Edit({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Category List" />

            <CategoryList siteData={siteData} />
        </DashboardLayout>
    );
}
