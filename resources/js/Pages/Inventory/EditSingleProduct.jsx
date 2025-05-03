import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateSingleInnerLayout from './Partials/Product/Create/CreateSingleInnerLayout';
import EditSingleInnerLayout from './Partials/Product/Edit/EditSingleInnerLayout';

export default function EditSingleProduct({
    auth,
    siteData,
    product,
    products,
    proCats,
    proSubCats,
    uomTitles,
    productArrType,
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Edit product" />
            <EditSingleInnerLayout
                product={product}
                products={products}
                proCats={proCats}
                proSubCats={proSubCats}
                uomTitles={uomTitles}
                productArrType={productArrType}
            />
        </DashboardLayout>
    );
}
