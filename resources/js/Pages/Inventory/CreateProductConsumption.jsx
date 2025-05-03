import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateConsumptionInnerLayout from './Partials/Product/Consumption/Create/CreateConsumptionInnerLayout';

export default function CreateProductProduction({ auth, siteData, products, productTitles, vendorTitles }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <CreateConsumptionInnerLayout
                products={products}
                productTitles={productTitles}
                vendorTitles={vendorTitles}
            />
        </DashboardLayout>
    );
}
