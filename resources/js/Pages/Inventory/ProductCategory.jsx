import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CategoryProductInnerLayout from './Partials/Category/CategoryProductInnerLayout';

export default function ProductCategory({ auth, siteData, categories, proParentCats }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <CategoryProductInnerLayout
                categories={categories}
                proParentCats={proParentCats}
            />
        </DashboardLayout>
    );
}
