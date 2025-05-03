import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateProductionInnerLayout from './Partials/Product/Production/Create/CreateProductionInnerLayout';

export default function CreateProductProduction({ auth, siteData, products, productTitles, vendorTitles }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <CreateProductionInnerLayout
                products={products}
                productTitles={productTitles}
                vendorTitles={vendorTitles}
            />
        </DashboardLayout>
    );
}
