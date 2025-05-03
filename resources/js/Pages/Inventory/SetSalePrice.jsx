import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import SetSalePriceInnerLayout from './Partials/StockMaster/SetSalePrice/SetSalePriceInnerLayout';

export default function SetSalePrice({
    auth,
    siteData,
    productNames,
    product,
    salePriceProduct,
 }) {

    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <SetSalePriceInnerLayout
                productNames={productNames}
                product={product}
                username={auth?.user?.username}
                salePriceProduct={salePriceProduct}
            />
        </DashboardLayout>
    );
}
