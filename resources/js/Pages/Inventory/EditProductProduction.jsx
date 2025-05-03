import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateProductionInnerLayout from './Partials/Product/Production/Create/CreateProductionInnerLayout';
import EditProductionInnerLayout from './Partials/Product/Production/Edit/EditProductionInnerLayout';

export default function EditProductProduction({
    auth,
    siteData,
    product,
    products,
    productTitles,
    vendorTitles,
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <EditProductionInnerLayout
                product={product}
                products={products}
                productTitles={productTitles}
                vendorTitles={vendorTitles}
            />
        </DashboardLayout>
    );
}
