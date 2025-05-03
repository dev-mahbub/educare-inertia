import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import CreateCategoryFeeInnerLayout from "./Partials/Fee/CreateCategoryFeeInnerLayout";

export default function Show({ auth, siteData, feeCategories, feeParent }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Fee Category
                </h2>
            }
        >
            <Head title="Fee category" />

            <CreateCategoryFeeInnerLayout
                feeCategories={feeCategories}
                feeParent={feeParent}
            />
        </DashboardLayout>
    );
}
