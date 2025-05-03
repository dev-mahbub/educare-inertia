import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ProductReportInnerLayout from './Partials/InventoryReport/ProductReport/ProductReportInnerLayout';

export default function ProductReport({
    auth,
    siteData,
    proCats,
    subProCats,
    productArrType,
    products,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <ProductReportInnerLayout
                proCats={proCats}
                subProCats={subProCats}
                productArrType={productArrType}
                products={products}
            />
        </DashboardLayout>
    );
}
