import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateSingleInnerLayout from './Partials/Product/Create/CreateSingleInnerLayout';

export default function CreateSingleProduct({ auth, siteData, products, proCats, uomTitles, productArrType, proSubCats }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <CreateSingleInnerLayout
                products={products}
                proCats={proCats}
                uomTitles={uomTitles}
                productArrType={productArrType}
                proSubCats={proSubCats}
            />
        </DashboardLayout>
    );
}
