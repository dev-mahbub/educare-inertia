import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import OpeningStockInnerLayout from './Partials/Product/OpeningStock/OpeningStockInnerLayout';

export default function OpeningStockProduct({
    auth,
    siteData,
    products,
    proCats,
    subProCats,
    catId,
    subCatId,
    search,
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <OpeningStockInnerLayout
                products={products}
                proCats={proCats}
                subProCats={subProCats}
                catId={catId}
                subCatId={subCatId}
                search={search}
            />
        </DashboardLayout>
    );
}
