import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateMultiInnerLayout from './Partials/Product/Multiple/CreateMultiInnerLayout';

export default function CreateMultiProduct({ auth, siteData, products, proCats, uomTitles, productArrType, proSubCats }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <CreateMultiInnerLayout
                products={products}
                proCats={proCats}
                uomTitles={uomTitles}
                productArrType={productArrType}
                proSubCats={proSubCats}
            />
        </DashboardLayout>
    );
}
